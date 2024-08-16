import { body, param } from "express-validator";
import { databaseModel } from "../model";

export const validatePostRoute = [
  body("originalUrl")
    .isURL()
    .notEmpty()
    .withMessage("original url must be a valid URL")
    .custom(() => {
      return true;
    }),

  body("customName")
    .optional()
    .isLength({ min: 5 })
    .withMessage("custom name must be at least 5 characters long")
    .isAlpha()
    .withMessage("custom name must contain only alphabetic characters")
    .custom(async (customName) => {
      if (customName) {
        const customNameExist = await databaseModel.findOne({ customName });
        if (customNameExist) {
          throw new Error("Custom name already exists");
        }
      }
      return true;
    }),
];

export const validateGetByIdRoute = [
  param("id")
    .exists()
    .withMessage("id not provided")
    .notEmpty()
    .withMessage("id cannot be empty")
    .custom(() => {
      return true;
    }),
];
