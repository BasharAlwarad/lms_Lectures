import { Order, User } from '../models/index.js';
import { CustomError } from '../utils/errorHandler.js';

// Get all orders
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll(); // Fetch all orders
    res.status(200).json(orders); // Respond with the orders and status 200 (OK)
  } catch (err) {
    next(new CustomError('Failed to fetch orders', 500)); // Pass error to the error handler
  }
};

// Get order by ID
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id); // Find order by ID
    if (!order) {
      return next(new CustomError('Order not found', 404)); // Order not found
    }
    res.status(200).json(order); // Respond with the order and status 200 (OK)
  } catch (err) {
    next(new CustomError('Failed to retrieve order', 500)); // Pass error to the error handler
  }
};

// Create new order
export const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body); // Create a new order
    res.status(201).json(order); // Respond with the created order and status 201 (Created)
  } catch (err) {
    next(new CustomError('Failed to create order', 500)); // Pass error to the error handler
  }
};

// Update order by ID
export const updateOrder = async (req, res, next) => {
  try {
    const [updated] = await Order.update(req.body, {
      where: { id: req.params.id },
    }); // Update order
    if (!updated) {
      return next(new CustomError('Order not found', 404)); // Order not found
    }
    const updatedOrder = await Order.findByPk(req.params.id); // Fetch the updated order
    res.status(200).json(updatedOrder); // Respond with the updated order and status 200 (OK)
  } catch (err) {
    next(new CustomError('Failed to update order', 500)); // Pass error to the error handler
  }
};

// Delete order by ID
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id); // Find the order by ID
    if (!order) {
      return next(new CustomError('Order not found', 404)); // Order not found
    }
    await order.destroy(); // Delete the order
    res.status(200).json({ message: 'Order deleted successfully' }); // Respond with success message
  } catch (err) {
    next(new CustomError('Failed to delete order', 500)); // Pass error to the error handler
  }
};

// INNER JOIN: Get users who have placed orders
export const innerJoin = async (req, res, next) => {
  try {
    const result = await User.findAll({
      include: {
        model: Order,
        required: true, // INNER JOIN: Only users with orders
      },
    });
    res.status(200).json(result); // Respond with the result and status 200 (OK)
  } catch (err) {
    next(new CustomError('Failed to perform inner join', 500)); // Pass error to the error handler
  }
};

// LEFT JOIN: Get all users, even those without orders
export const leftJoin = async (req, res, next) => {
  try {
    const result = await User.findAll({
      include: {
        model: Order,
        required: false, // LEFT JOIN: All users, even without orders
      },
    });
    res.status(200).json(result); // Respond with the result and status 200 (OK)
  } catch (err) {
    next(new CustomError('Failed to perform left join', 500)); // Pass error to the error handler
  }
};

// RIGHT JOIN: Get all orders, even those without users
export const rightJoin = async (req, res, next) => {
  try {
    const result = await Order.findAll({
      include: {
        model: User,
        required: false, // Simulating RIGHT JOIN by querying Order table
      },
    });
    res.status(200).json(result); // Respond with the result and status 200 (OK)
  } catch (err) {
    next(new CustomError('Failed to perform right join', 500)); // Pass error to the error handler
  }
};

// FULL OUTER JOIN: Get all users and orders
// This is a simulation of FULL OUTER JOIN in Sequelize
export const fullJoin = async (req, res, next) => {
  try {
    const leftJoin = await User.findAll({
      include: {
        model: Order,
        required: false, // LEFT JOIN
      },
    });

    const rightJoin = await Order.findAll({
      include: {
        model: User,
        required: false, // RIGHT JOIN
      },
    });

    // Merge both results (simulate FULL OUTER JOIN)
    const fullJoinResult = [...leftJoin, ...rightJoin];

    res.status(200).json(fullJoinResult); // Respond with the full join result and status 200 (OK)
  } catch (err) {
    next(new CustomError('Failed to perform full join', 500)); // Pass error to the error handler
  }
};
