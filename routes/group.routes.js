import express from "express";
import auth from "../middleware/auth.middleware.js";
import Group from "../models/Group.js";

const router = express.Router();

// GET ALL GROUPS
router.get("/", auth, async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.user.id
    });

    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch groups" });
  }
});

// CREATE GROUP
router.post("/", auth, async (req, res) => {
  try {
    const group = new Group({
      name: req.body.name,
      members: [req.user.id],
      createdBy: req.user.id
    });

    await group.save();
    res.json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create group" });
  }
});

export default router;
