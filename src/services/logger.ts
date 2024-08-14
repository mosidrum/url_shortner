import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;

const defaultFormatter = printf(
  ({ level, message, timestamp }: never) =>
    `${timestamp} [${level}] : ${message}`,
);

const commonFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  defaultFormatter,
);

export const logger = createLogger({
  level: process.env.example.LOG_LEVEL || "info",
  format: commonFormat,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new transports.File({
      filename: "logs/combined.log",
    }),
  ],
});
