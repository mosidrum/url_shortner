import { Request, Response, NextFunction } from "express";
import { logger } from "../services";
import {
  STATUS_CODES,
  handleError,
  reformatCustomName,
  sendResponse,
} from "../utils";
import { databaseModel } from "../model";
import { BASE_URL } from "../utils/constants";

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { originalUrl, customName } = req.body;

    const urlToEdit = await databaseModel.findById(id);

    if (!urlToEdit) {
      return sendResponse({
        res,
        statusCode: STATUS_CODES.NOT_FOUND,
        message: "URL not found",
      });
    }

    if (originalUrl) {
      urlToEdit.originalUrl = originalUrl;
    }

    if (customName) {
      urlToEdit.customName = customName;
      urlToEdit.shortUrl = `${BASE_URL}/${reformatCustomName(customName)}`;
    }

    const updatedUrl = await urlToEdit.save();

    return sendResponse({
      res,
      statusCode: STATUS_CODES.OK,
      message: "Updated successfully",
      data: updatedUrl,
    });
  } catch (error) {
    logger.error(error);
    return handleError(error as Error, req, res, next);
  }
};
