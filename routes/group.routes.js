const router = require("express").Router();
const Group = require("../models/Group");
const auth = require("../middleware/auth.middleware");

// Create group
router.post("/", auth, async (req, res) => {
  try {
    const group = await Group.create({
      name: req.body.name,
      members: [req.userId],
      createdBy: req.userId
    });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user groups
router.get("/", auth, async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.userId
    });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
