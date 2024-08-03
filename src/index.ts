import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to url shorter api");
});

app.listen(port, () => {
  console.log(`Server started and listening on port: ${port}`);
});
