import { body, param } from "express-validator";
import { databaseModel } from "../model";

export const validatePassedData = [
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
    .withMessage("Custom name must be more than 5 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Custom name should be alphabets")
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

export const validatePasssedId = [
  param("id")
    .exists()
    .withMessage("id not provided")
    .notEmpty()
    .withMessage("id cannot be empty")
    .custom(() => {
      return true;
    }),
];
