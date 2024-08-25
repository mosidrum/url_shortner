import { Request, Response, NextFunction } from "express";
import { logger } from "../services";
import { STATUS_CODES, handleError, sendResponse } from "../utils";
import { databaseModel } from "../model";

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { originalUrl, customName } = req.body;
    const urlToEdited = await databaseModel.findById({ _id: id });

    urlToEdited!.originalUrl = originalUrl ?? originalUrl;
    urlToEdited!.customName = customName ?? customName;

    const updatedUrl = await urlToEdited!.save();

    return sendResponse({
      res,
      statusCode: STATUS_CODES.OK,
      message: "Updated succesfully",
      data: updatedUrl,
    });
  } catch (error) {
    logger.error(error);
    return handleError(error as Error, req, res, next);
  }
};
