const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error("Error:", {
    message: err.message,
    statusCode,
  });

  return res.status(statusCode).json({
    error:
      statusCode === 500
        ? "Internal server error"
        : err.message,
  });
};

module.exports = {
  errorHandler,
};
