import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      _id: "1",
      name: "Goa Trip",
      members: ["alice@test.com"]
    }
  ]);
});

export default router;
