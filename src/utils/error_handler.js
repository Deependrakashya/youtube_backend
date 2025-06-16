// middlewares/errorHandler.js
import { ApiErrors } from "./api_errors.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiErrors) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // fallback for unknown errors
  return res.status(500).json({
    message: err.message || "Internal Server Error",
    statusCode: 500,
    success: false,
    stack: err.stack,
  });
};

export default errorHandler;
