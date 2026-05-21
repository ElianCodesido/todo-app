import express from "express";
import {
  getLists,
  createList,
  updateList,
  deleteList,
} from "../controllers/listController.js";

const router = express.Router();

router.get("/:userId", getLists);
router.post("/", createList);
router.put("/:id", updateList);
router.delete("/:id", deleteList);

export default router;
