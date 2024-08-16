import express, { NextFunction } from "express";
import { databaseModel } from "../model";
import { logger } from "../services";
import { generateCustomName, STATUS_CODES } from "../utils";
import { handleError, sendResponse } from "../utils";

export const postUrl = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { originalUrl, customName } = req.body;

    const shortUrl = await databaseModel.create({
      originalUrl,
      shortUrl: customName || generateCustomName(),
    });

    return sendResponse(res, STATUS_CODES.CREATED, {
      message: "Created successful",
      shortUrl,
    });
  } catch (error) {
    logger.error(error);
    return handleError(error as Error, req, res, next);
  }
};
