const AppError = require("../../utils/AppError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}.`;
  return new AppError(message, 400);
};

const handledDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  // console.log(value);
  const message = `Duplicate Field value : ${value[0]}. Please Use Another Value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid Input Data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError("Invalid token. Please Login again", 401);

const handleJWTExpiredError = (err) =>
  new AppError("Your token has expired! Please login again!", 401);

const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // RENDERED
    res.status(err.statusCode).json({
      title: "Something Went Wrong!",
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.log("ERROR 💥", err);
      // Unknown Error
      res.status(500).json({
        status: "error",
        message: "Something went Very Wrong!!",
      });
    }
  } else {
    // RENDERED WEBSITE
    if (err.isOperational) {
      res.status(err.statusCode).json({
        title: "Something Went wrong!",
        msg: err.message,
      });
    } else {
      console.log("ERROR 💥", err);
      // Unknown Error
      res.status(err.statusCode).render("error", {
        title: "Something Went Wrong!",
        msg: "Please try again Later.",
      });
    }
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = err;

    // console.log(error.name);

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handledDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error);
    sendErrorProd(error, req, res);
  }
};
