import { NextFunction, Request, Response } from "express";
import { logger } from "../services";
import { STATUS_CODES } from "../utils";

type SendResponseType<T> = {
  res: Response;
  statusCode: number;
  data?: T;
  message?: string;
};

export const sendResponse = <T>({
  res,
  statusCode,
  message,
  data,
}: SendResponseType<T>) => {
  return res.status(statusCode).json({
    message: message ?? "Created successfully",
    data,
  });
};

export const handleError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(error);
  }
  logger.error(`${error.message} - ${req.path}`);

  return res.status(STATUS_CODES.SERVER_ERROR).json({
    message: error.message || "An unexpected error occurred",
    path: req.path,
  });
};
