import { NextFunction, Request, Response } from "express";
import { databaseModel } from "../model";
import { STATUS_CODES } from "../utils";
import { customError } from "../error";

export const checkDuplicates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { originalUrl, customName } = req.body;

    const duplicate = await databaseModel.findOne({
      $or: [{ shortUrl: customName }, { originalUrl: originalUrl }],
    });

    if (duplicate) {
      return new customError("Duplicates, Try again!", STATUS_CODES.CONFLICT);
    }

    next();
  } catch (error) {
    next(error);
  }
};
