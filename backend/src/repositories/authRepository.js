import { db } from "../config/db.js";

export const getUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT id, email, password_hash as passwordHash, created_at as createdAt FROM users WHERE email = ?",
    [email],
  );

  return rows[0];
};
export const register = async (email, password) => {
  const [result] = await db.query(
    "INSERT INTO users (email, password_hash) VALUES (?, ?)",
    [email, password],
  );
  return result;
};
