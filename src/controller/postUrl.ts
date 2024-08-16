import { NextFunction, Request, Response } from "express";
import { databaseModel } from "../model";
import { logger } from "../services";
import { handleError, sendResponse, STATUS_CODES } from "../utils";

export const postUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { originalUrl, customName } = req.body;

    const shortUrl = await databaseModel.create({
      originalUrl,
      customName: customName || "",
    });

    return sendResponse(res, STATUS_CODES.CREATED, shortUrl);
  } catch (error) {
    logger.error(error);
    return handleError(error as Error, req, res, next);
  }
};
