import express from "express";
import { createExpense, getExpenses } from "../controllers/expense.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createExpense);
router.get("/", getExpenses);

export default router;