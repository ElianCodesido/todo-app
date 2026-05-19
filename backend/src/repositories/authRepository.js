import { db } from "../config/db.js";
import bcrypt from "bcrypt";

export const register = async (email, password) => {
  const password_hash = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    "INSERT INTO users (email, password_hash) VALUES (?, ?)",
    [email, password_hash],
  );
  return result;
};
export const login = async (email, password) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  const user = rows[0];
  if (!user) {
    return null;
  }
  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (passwordMatch) {
    console.log("Logged successfully!!");
    return user;
  }
  return null;
};
export const logout = async () => {
  //logica para cerrar la sesion?
};
