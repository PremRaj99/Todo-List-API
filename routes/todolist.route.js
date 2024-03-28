import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deleteList,
  editList,
  getList,
} from "../controllers/todolist.controller.js";

const router = express.Router();

// router method

router.post("/create/:userId", verifyToken, create);
router.get("/getlist", verifyToken, getList);
router.delete("/deletelist/:userId/:listId", verifyToken, deleteList);
router.put("/editlist/:userId/:listId", verifyToken, editList);

export default router;
