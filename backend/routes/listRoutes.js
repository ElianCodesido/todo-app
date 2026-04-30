import express from "express";
import {
  getlists,
  getListById,
  createList,
  updateList,
  deleteList,
} from "../controllers/listController.js";

const router = express.Router();

router.get("/", getlists);
router.get("/:id", getListById);
router.post("/", createList);
router.put("/:id", updateList);
router.delete("/:id", deleteList);

export default router;
