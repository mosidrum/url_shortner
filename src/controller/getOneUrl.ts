import { NextFunction, Request, Response } from "express";
import { handleError, sendResponse, STATUS_CODES } from "../utils";
import { databaseModel } from "../model";

export const getOneUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const url = await databaseModel.findById({ _id: id });

    return sendResponse({
      res,
      statusCode: STATUS_CODES.OK,
      data: url,
      message: "Ok",
    });
  } catch (error) {
    return handleError(error as Error, req, res, next);
  }
};
