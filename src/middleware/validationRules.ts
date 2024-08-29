import { body, param } from "express-validator";

export const createUrlValidationRule = [
  body("originalUrl")
    .isURL()
    .notEmpty()
    .withMessage("original url must be a valid URL"),

  body("customName")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Custom name must be more than 5 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Custom name should be alphabets"),
];

export const getUrlValidationRule = [
  param("id", "is not a valid mongo id").isMongoId(),
];
