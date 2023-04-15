const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicateNameError = (err) => {
  const message = `Email or phone number already exists.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((errObj) => errObj.message);
  const message = `Invalid Input: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleInvalidLoginError = () =>
  new AppError("Invalid Email or Password", 401);

const handleJWTError = () =>
  new AppError("Invalid Token. Please login in again", 401);

const handleJWTExpiredError = () =>
  new AppError("Token Expired. Please log in again.", 401);

const sendErrorDev = function (err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = function (err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // eslint-disable-next-line no-console
    console.log("ERROR 💥");

    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV.trim() === "development") {
    // console.log(err.name);
    let error = { ...err };

    console.log(err.message);

    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.code === 11000) error = handleDuplicateNameError(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();
    if (err?.message === "InvalidCredentials")
      error = handleInvalidLoginError();

    sendErrorProd(error, res);
    // sendErrorDev(err, res);
  } else if (process.env.NODE_ENV.trim() === "production") {
    let error = { ...err };

    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.code === 11000) error = handleDuplicateNameError(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
