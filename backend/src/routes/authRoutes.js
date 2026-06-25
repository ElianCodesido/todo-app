import express from "express";
import { register, login, me } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/me", authMiddleware, me);

router.post("/register", register);
router.post("/login", login);

export default router;
