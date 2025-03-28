// discountMiddleware.js
const discountMiddleware = (req, res, next) => {
  if (req.body.price) {
    req.body.price = req.body.price * 0.5; // Apply 50% discount
    console.log('Discount applied: 50% off');
  }
  next(); // Pass control to the next middleware or route handler
};

export default discountMiddleware;
