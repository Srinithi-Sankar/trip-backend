const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  title: { type: String, required: true },
  amount: { type: Number, required: true },

  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  splitType: {
    type: String,
    enum: ["equal", "percentage", "custom"],
    default: "equal"
  },

  splits: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      value: Number // percent or amount depending on splitType
    }
  ],

  category: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", expenseSchema);
