import { NextFunction, Request, Response } from "express";
import { logger } from "../services";
import { STATUS_CODES } from "../utils";
import { customError } from "../error";

export const sendResponse = <T>(res: Response, statusCode: number, data: T) => {
  return res.status(statusCode).json({
    message: "Data retrieved successfully",
    data,
  });
};

export const handleError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof customError) {
    return res.status(error.statusCode).json({
      message: error.message || "An error occurred",
      path: req.path,
    });
  }

  logger.error(`${error.message} - ${req.path}`);

  next({
    statusCode: STATUS_CODES.SERVER_ERROR,
    message: "An unexpected error occurred",
    path: req.path,
  });
};
