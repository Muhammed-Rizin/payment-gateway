import ErrorHandler from "../utils/errorHandler.js";
import HttpStatus from "http-status-codes";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  err.message = err.message || "Internal Server Error";
  // mongodb id error
  if (err.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.code === "JsonWebTokenError") {
    const message = "JWT Error";
    err = new ErrorHandler(message, 400);
  }

  // jwt expire error
  if (err.code === "JsonWebTokenError") {
    const message = "JWT is Expired";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    code: err.statusCode,
    message: err.message,
    status: HttpStatus.getReasonPhrase(err.statusCode),
  });
};
