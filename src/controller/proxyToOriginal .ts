import { Request, Response, NextFunction } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { databaseModel } from "../model";
import { handleError, STATUS_CODES } from "../utils";
import { logger } from "../services";

export const proxyToOriginal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { short } = req.params;
    const found = await databaseModel.findOne({
      $or: [
        { shortUrl: { $regex: short, $options: "i" } },
        { customName: short },
      ],
    });

    if (!found) {
      return res.status(STATUS_CODES.NOT_FOUND).send("Short URL not found");
    }

    const proxy = createProxyMiddleware({
      target: found.originalUrl,
      changeOrigin: true,
      followRedirects: true,
      logLevel: "silent",
      onProxyReq(proxyReq) {
        // optional headers
        proxyReq.setHeader("X-Shortened-By", "YourApp");
      },
      onError(err, req, res) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Proxy Error: " + err.message);
      },
    });

    return proxy(req, res, next);
  } catch (error) {
    logger.error(error);
    return handleError(error as Error, req, res, next);
  }
};
