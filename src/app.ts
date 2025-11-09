import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import { connectDB } from "./config/database.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to DevDiary API" });
});
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export default app;
