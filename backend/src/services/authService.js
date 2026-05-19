import { register, login, logout } from "../repositories/authRepository.js";

export const registerService = async (data) => {
  const newUser = await register(data.email, data.password);
  if (!newUser) {
    throw new Error("Register Error.");
  }
};
export const loginService = async (data) => {
  const logged = await login(data.email, data.password);
  if (!logged) {
    throw new Error("Register Error.");
  }
  return logged;
};
export const logoutService = async () => {
  const loggedOut = await logout();
  if (!loggedOut) {
    throw new Error("Register Error.");
  }
};
