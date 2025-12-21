const router = require("express").Router();
const Expense = require("../models/Expense");
const Group = require("../models/Group");
const auth = require("../middleware/auth.middleware");
const calculateSplits = require("../utils/splitCalculator");

// Add expense with smart split
router.post("/", auth, async (req, res) => {
  try {
    const { group, title, amount, splitType, splits } = req.body;

    const grp = await Group.findById(group);
    if (!grp) return res.status(404).json({ message: "Group not found" });

    const calculatedSplits = calculateSplits({
      amount,
      splitType,
      splits,
      participants: grp.members
    });

    const expense = await Expense.create({
      group,
      title,
      amount,
      paidBy: req.userId,
      splitType,
      splits: calculatedSplits
    });

    res.json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get expenses by group
router.get("/:groupId", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({
      group: req.params.groupId
    }).populate("splits.user", "name email");

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
