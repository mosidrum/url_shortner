import express from "express";
import { getAllUrl, getOneUrl, postUrl } from "../controller";
import {
  checkDuplicates,
  checkUrlId,
  validatePasssedId,
  validatePassedData,
  validateRequest,
} from "../middleware";

export const router = express.Router();

router.post(
  "/urls",
  validatePassedData,
  checkDuplicates,
  validateRequest,
  postUrl,
);
router.get(
  "/urls/:id",
  validatePasssedId,
  checkUrlId,
  validateRequest,
  getOneUrl,
);
router.get("/urls", validateRequest, getAllUrl);
