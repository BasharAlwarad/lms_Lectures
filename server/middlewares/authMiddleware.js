import { CustomError } from '../utils/errorHandler.js';

export const auth = (req, res, next) => {
  if (req.body.user_password !== '123456') {
    throw new CustomError('Unauthorized from middleware!', 401); // User is not authorized
  }
  console.log(req.body);
  next(); // Call next middleware or route handler
};
