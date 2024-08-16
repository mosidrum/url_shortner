import mongoose from "mongoose";
import { generateCustomName } from "../utils";

const shortenedURLSchema = new mongoose.Schema(
  {
    customName: {
      type: String,
      unique: true,
      sparse: true,
    },
    shortUrl: {
      type: String,
      required: false,
      unique: true,
      default: () => generateCustomName(),
    },
    originalUrl: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const databaseModel = mongoose.model("shortUrl", shortenedURLSchema);
