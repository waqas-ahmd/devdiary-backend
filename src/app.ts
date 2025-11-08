import express from "express";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Blogs Application API");
});

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export default app;
