import {
  registerService,
  loginService,
  logoutService,
} from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const user = await registerService(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const login = async (req, res) => {
  try {
    const user = await loginService(req.body);
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
export const logout = async (req, res) => {
  await logoutService(req.body);
  res.status(200);
};
