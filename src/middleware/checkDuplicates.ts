import { NextFunction, Request, Response } from "express";
import { databaseModel } from "../model";
import { sendResponse, STATUS_CODES } from "../utils";

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
      return sendResponse({
        res,
        statusCode: STATUS_CODES.CONFLICT,
        message: "Duplicates, Try again",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
