import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Blogs Application API");
});

export default app;
