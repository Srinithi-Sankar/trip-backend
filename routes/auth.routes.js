import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();   

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    // TEMPORARY: skip password validation

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      userId: user._id,
      username: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
