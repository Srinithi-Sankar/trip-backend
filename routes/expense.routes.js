import express from "express";
import Expense from "../models/Expense.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const expense = new Expense({
    title: req.body.title,
    amount: req.body.amount,
    groupId: req.body.groupId,
    paidBy: req.userId,
  });

  await expense.save();
  res.json(expense);
});

export default router;
