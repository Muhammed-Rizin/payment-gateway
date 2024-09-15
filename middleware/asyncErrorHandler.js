"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import ErrorHandler from "../utils/errorHandler.js";
import Response from "../utils/responseHandler.js";
import HttpStatus from "http-status-codes";
export default (errorFunction) => (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const result = yield errorFunction(req, res, next);
      if (result instanceof Response) {
        let response = {
          success: true,
          code: result.statusCode,
          status: HttpStatus.getReasonPhrase(result.statusCode),
        };

        if (result.status) response.message = result.status;
        if (result.data) response = { ...response, ...result.data };
        res.status(result.statusCode).json(response);
      }
      //  else {
      //   next(new ErrorHandler("Invalid Response. Expected Response object.", 500));
      // }
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  });
