import mongoose, { Document } from "mongoose";

export interface IShortenedURL extends Document {
  customName?: string;
  shortUrl?: string;
  originalUrl: string;
  createdAt: Date;
}

const shortenedURLSchema = new mongoose.Schema<IShortenedURL>(
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
    },
    originalUrl: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_, ret: Record<string, unknown>) {
        ret.id = ret._id?.toString();
        delete ret._id;
        return ret;
      },
    },
  },
);

shortenedURLSchema.virtual("id").get(function (this: IShortenedURL) {
  return (this._id as mongoose.Types.ObjectId).toHexString();
});

export const databaseModel = mongoose.model<IShortenedURL>(
  "shortUrl",
  shortenedURLSchema,
);
