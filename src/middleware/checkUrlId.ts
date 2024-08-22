import { Request, Response, NextFunction } from "express";
import { databaseModel } from "../model";
import { STATUS_CODES, sendResponse } from "../utils";

export const checkUrlId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const url = await databaseModel.findById({ _id: id });
    if (!url) {
      return sendResponse({
        res,
        statusCode: STATUS_CODES.NOT_FOUND,
        message: "Does not exist",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
