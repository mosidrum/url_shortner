import express from "express";
import { getAllUrl, getOneUrl, postUrl } from "../controller";
import {
  checkDuplicates,
  validateGetByIdRoute,
  validatePostRoute,
  validateRequest,
} from "../middleware";

export const router = express.Router();

router.post(
  "/urls",
  validatePostRoute,
  checkDuplicates,
  validateRequest,
  postUrl,
);
router.get("/urls/:id", validateGetByIdRoute, validateRequest, getOneUrl);
router.get("/urls", validateRequest, getAllUrl);
