import { NextFunction, Request, Response } from "express";
import { databaseModel } from "../model";
import { logger } from "../services";
import {
  generateCustomName,
  handleError,
  reformatCustomName,
  sendResponse,
  STATUS_CODES,
} from "../utils";

export const postUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { originalUrl, customName } = req.body;

    const duplicate = await databaseModel.findOne({
      $or: [{ customName: customName }, { originalUrl: originalUrl }],
    });

    if (duplicate) {
      return sendResponse({
        res,
        statusCode: STATUS_CODES.CONFLICT,
        message: "Duplicates, Try again",
      });
    }

    const shortUrl = await databaseModel.create({
      originalUrl,
      customName,
      shortUrl: `${process.env.BASE_URL}/${customName ? reformatCustomName(customName) : generateCustomName()}`,
    });

    return sendResponse({
      message: "Url created successfully",
      res,
      statusCode: STATUS_CODES.CREATED,
      data: shortUrl,
    });
  } catch (error) {
    logger.error(error);
    return handleError(error as Error, req, res, next);
  }
};
