import Response from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import asyncErrorHandler from "../middleware/asyncErrorHandler.js";

global.isNull = (field) => {
  return (
    field === undefined ||
    field === "undefined" ||
    field === "" ||
    field === null ||
    field === "null"
  ); // || !!!field;
};

global.asyncErrorHandler = asyncErrorHandler;
global.Error = ErrorHandler;
global.Response = Response;
