import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { logger } from "./services";
import { connectDB } from "./config";
import { router } from "./router";
import cors from "cors";

dotenv.config();
connectDB();

const port = process.env.PORT || 8080;

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.PRODUCTION_URL,
].filter(Boolean);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true,
  }),
);

app.get("/", (_: Request, res: Response) => {
  res.json({
    message: "Welcome to this url shorter api, made by Isaac Ayodele",
  });
});

app.use("/api/v1", router);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Invalid route" });
});

app.listen(port, () => {
  logger.info(`Server started and listening on port: http://localhost:${port}`);
});
