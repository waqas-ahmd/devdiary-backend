import express from "express";
import userRoutes from "./routes/user.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Blogs Application API");
});

app.use(express.json());

app.use("/api/users", userRoutes);

export default app;
