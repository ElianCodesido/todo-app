import { registerService, loginService } from "../services/authService.js";

export const me = async (req, res) => {
  res.json(req.user);
};

export const register = async (req, res) => {
  try {
    const user = await registerService(req.body.email, req.body.password);
    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message,
    });
  }
};
