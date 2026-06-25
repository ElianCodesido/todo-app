import express from "express";
import {
  getTodosByList,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/:listId", getTodosByList);
router.post("/", createTodo);
router.patch("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);

export default router;
