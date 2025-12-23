import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import groupRoutes from "./routes/group.routes.js";

dotenv.config();

const app = express();

// ✅ MIDDLEWARE
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true
}));

// ✅ TEST ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);

// ❌ TEMP: COMMENT MONGODB (to avoid timeout today)
/*
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
*/

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
