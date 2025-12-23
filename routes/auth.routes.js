import express from "express";
const router = express.Router();

// ✅ TEMP REGISTER
router.post("/register", async (req, res) => {
  res.json({
    message: "User registered (TEMP)",
    user: req.body
  });
});

// ✅ TEMP LOGIN (NO DB)
router.post("/login", async (req, res) => {
  res.json({
    token: "test-token",
    user: {
      email: req.body.email
    }
  });
});

export default router;
