import express from "express";
import {
  getAllUrl,
  getOneUrl,
  postUrl,
  updateOne,
  deleteOne,
} from "../controller";
import {
  idParamRule,
  createUrlValidationRule,
  validateRequest,
  updateOneValidationRule,
} from "../middleware";

export const router = express.Router();

router.post("/urls", createUrlValidationRule, validateRequest, postUrl);

router.get("/urls", validateRequest, getAllUrl);
router.get("/urls/:id", idParamRule, validateRequest, getOneUrl);

router.put(
  "/urls/:id",
  idParamRule,
  updateOneValidationRule,
  validateRequest,
  updateOne,
);
router.delete("/urls/:id", idParamRule, validateRequest, deleteOne);
