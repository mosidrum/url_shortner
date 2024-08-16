import { NextFunction, Request, Response } from "express";
import { databaseModel } from "../model";
import { logger } from "../services";
import { STATUS_CODES } from "../utils";
import { handleError, sendResponse } from "../utils/responseHandlers";

export const getAllUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allUrls = await databaseModel.find({});
    if (allUrls.length === 0) {
      return sendResponse(res, STATUS_CODES.OK, []);
    }
    return sendResponse(res, STATUS_CODES.OK, allUrls);
  } catch (error) {
    logger.error(error);
    return handleError(error as Error, req, res, next);
  }
};
