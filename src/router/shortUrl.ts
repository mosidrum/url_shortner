import express from "express";
import { getAllUrl, getOneUrl, postUrl } from "../controller";
import {
  getUrlValidationRule,
  createUrlValidationRule,
  validateRequest,
} from "../middleware";

export const router = express.Router();

router.post("/urls", createUrlValidationRule, validateRequest, postUrl);

router.get("/urls/:id", getUrlValidationRule, validateRequest, getOneUrl);

router.get("/urls", validateRequest, getAllUrl);
