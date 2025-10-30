import express, { Response, Request } from "express";
import dotenv from "dotenv";
import { logger } from "./services";
import { connectDB } from "./config";
import { router } from "./router";
import { Error } from "mongoose";
dotenv.config();
connectDB();

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_: Request, res: Response) => {
  res.json({
    message: "Welcome to this url shorter api, made by Isaac Ayodele",
  });
});

app.use("/api/v1", router);

router.all("*", () => {
  throw new Error("Invalid route");
});

app.listen(port, () => {
  logger.info(`Server started and listening on port: ${port}`);
});
