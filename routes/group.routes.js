import express from "express";
import Group from "../models/Group.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const group = new Group({
      name: req.body.name,
      members: [req.userId],
      createdBy: req.userId,
    });

    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const groups = await Group.find({ members: req.userId });
  res.json(groups);
});

export default router;
