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
    const allUrls = await databaseModel.find();
    if (allUrls.length === 0) {
      return sendResponse({ res, statusCode: STATUS_CODES.OK, data: [] });
    }
    return sendResponse({ res, statusCode: STATUS_CODES.OK, data: allUrls });
  } catch (error) {
    return handleError(error as Error, req, res, next);
  }
};
