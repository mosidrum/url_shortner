import { NextFunction, Request, Response } from "express";
import { handleError, sendResponse, STATUS_CODES } from "../utils";
import { databaseModel } from "../model";
import { customError } from "../error";

export const getOneUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const url = await databaseModel.findById({ _id: id });
    if (!url) {
      throw new customError("Url not found", STATUS_CODES.NOT_FOUND);
    }
    return sendResponse(res, STATUS_CODES.OK, url);
  } catch (error) {
    return handleError(error as Error, req, res, next);
  }
};
