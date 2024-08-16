import { NextFunction, Request, Response } from "express";
import { databaseModel } from "../model";
import { STATUS_CODES } from "../utils";

export const checkDuplicates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { originalUrl, customName } = req.body;

    if (customName) {
      const checkName = await databaseModel.findOne({ shortUrl: customName });
      if (checkName) {
        return res
          .status(STATUS_CODES.CONFLICT)
          .json({ message: "Duplicate custom name, Try again!" });
      }
    }

    if (originalUrl) {
      const checkUrl = await databaseModel.findOne({ originalUrl });
      if (checkUrl) {
        return res
          .status(STATUS_CODES.CONFLICT)
          .json({ message: "Duplicate URL, Try again!" });
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
