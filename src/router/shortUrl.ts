import express from "express";
import { getAllUrl, getOneUrl, postUrl, updateOne } from "../controller";
import {
  getUrlValidationRule,
  createUrlValidationRule,
  validateRequest,
} from "../middleware";

export const router = express.Router();

router.post("/urls", createUrlValidationRule, validateRequest, postUrl);

router.get("/urls/:id", getUrlValidationRule, validateRequest, getOneUrl);

router.get("/urls", validateRequest, getAllUrl);
router.put(
  "/urls/:id",
  validateGetByIdRoute,
  checkUrlId,
  validateRequest,
  updateOne,
);
