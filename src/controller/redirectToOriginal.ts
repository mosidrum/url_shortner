import { Request, Response } from "express";
import { BASE_URL } from "../utils/constants";
import { databaseModel } from "../model";
import { sendResponse, STATUS_CODES } from "../utils";

export const redirectToOriginal = async (req: Request, res: Response) => {
  const { code } = req.params;
  const shortUrl = `${BASE_URL}/${code}`;

  const record = await databaseModel.findOne({ shortUrl });

  if (!record) {
    return sendResponse({
      res,
      statusCode: STATUS_CODES.NOT_FOUND,
      message: "URL not found",
    });
  }

  return res.redirect(record.originalUrl);
};
