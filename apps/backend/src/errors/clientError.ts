import { StatusCodes } from "http-status-codes";

class ClientError extends Error {
  public explanation: string;
  public statusCode: number;

  constructor(error: {
    message: string;
    explanation: string;
    statusCode?: number;
  }) {
    super(error.message);

    this.name = "ClientError";
    this.explanation = error.explanation;
    this.statusCode = error.statusCode ?? StatusCodes.BAD_REQUEST;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ClientError;
