import express from "express";
import {
  getLists,
  createList,
  updateList,
  deleteList,
} from "../controllers/listController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getLists);
router.post("/", createList);
router.patch("/:id", updateList);
router.delete("/:id", deleteList);

export default router;
