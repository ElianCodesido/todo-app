import { register, getUserByEmail } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpError } from "../errors/HttpError.js";

const validateEmail = (email) => {
  if (typeof email !== "string") {
    throw new HttpError(400, "Invalid email.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new HttpError(400, "Invalid email.");
  }
};

const validatePass = (pass) => {
  if (typeof pass !== "string") {
    throw new HttpError(400, "Invalid format. Password must be text.");
  }

  if (pass.trim().length < 8) {
    throw new HttpError(400, "Password must be at least 8 characters.");
  }
};

export const registerService = async (email, password) => {
  validateEmail(email);
  validatePass(password);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new HttpError(409, "Email already registered.");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await register(email, passwordHash);
  if (!newUser) {
    throw new HttpError(500, "Register Error.");
  }
  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      createdAt: newUser.createdAt,
    },
  };
};

export const loginService = async (email, password) => {
  validateEmail(email);
  validatePass(password);

  const user = await getUserByEmail(email);

  if (!user) {
    throw new HttpError(401, "Invalid email or password.");
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    throw new HttpError(401, "Invalid email or password.");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    },
  };
};
