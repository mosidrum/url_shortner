import { Response, Request, NextFunction } from "express";
import { logger } from "../services";
import { STATUS_CODES, handleError, sendResponse } from "../utils";
import { databaseModel } from "../model";

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const urlToDelete = await databaseModel.findByIdAndDelete(id);
    return sendResponse({
      res,
      statusCode: STATUS_CODES.OK,
      message: "Deleted succesfully",
      data: urlToDelete,
    });
  } catch (error) {
    logger.error(error);
    return handleError(error as Error, req, res, next);
  }
};
