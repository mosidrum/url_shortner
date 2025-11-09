import { NextFunction, Request, Response } from "express";
import { databaseModel } from "../model";
import { STATUS_CODES } from "../utils";
import { handleError, sendResponse } from "../utils/";

export const getAllUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allUrls = await databaseModel.find().sort({ createdAt: -1 });
    return sendResponse({
      res,
      statusCode: STATUS_CODES.OK,
      data: allUrls,
      message: "Urls fetched successfully",
    });
  } catch (error) {
    return handleError(error as Error, req, res, next);
  }
};
