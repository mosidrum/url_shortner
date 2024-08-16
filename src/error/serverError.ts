import { STATUS_CODES } from "../utils";

export class ServerError extends Error {
  public statusCode: number;

  constructor(
    message: string = "Internal server error",
    statusCode: number = STATUS_CODES.SERVER_ERROR,
  ) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
