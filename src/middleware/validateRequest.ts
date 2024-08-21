import { validationResult } from "express-validator";
import { STATUS_CODES } from "../utils";
import { Request, Response, NextFunction } from "express";
import { FieldValidationError } from "express-validator/lib/base";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => {
      const validationError = error as FieldValidationError;
      return {
        message: validationError.msg,
        path: validationError.path,
      };
    });

    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ errors: formattedErrors });
  }

  next();
};
