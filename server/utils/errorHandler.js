// CustomError class extends the built-in Error class to include a status code.
// This allows us to throw errors with both a message and a specific HTTP status code.
export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent class (Error) constructor with the message.
    this.statusCode = statusCode; // Store the status code for HTTP response.
  }
}

// Middleware function to handle errors globally in the application.
export const errorHandler = (err, req, res, next) => {
  // If the error is an instance of CustomError, use its status code and message.
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message, // Detailed error message for development.
    });
  }

  // If the error is not a CustomError, respond with a generic 500 Internal Server Error.
  res.status(500).json({
    message: err.message, // Show error message in development.
  });
};
