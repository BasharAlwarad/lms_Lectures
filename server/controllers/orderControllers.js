import { Order, User } from '../models/index.js';

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update order by ID
export const updateOrder = async (req, res) => {
  try {
    await Order.update(req.body, { where: { id: req.params.id } });
    const updatedOrder = await Order.findByPk(req.params.id);
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete order by ID
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// INNER JOIN: Get users who have placed orders
export const innerJoin = async (req, res) => {
  try {
    const result = await User.findAll({
      include: {
        model: Order,
        required: true, // INNER JOIN: Only users with orders
      },
    });
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// LEFT JOIN: Get all users, even those without orders
export const leftJoin = async (req, res) => {
  try {
    const result = await User.findAll({
      include: {
        model: Order,
        required: false, // LEFT JOIN: All users, even without orders
      },
    });
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// RIGHT JOIN: Get all orders, even those without users
export const rightJoin = async (req, res) => {
  try {
    const result = await Order.findAll({
      include: {
        model: User,
        required: false, // Simulating RIGHT JOIN by querying Order table
      },
    });
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// FULL OUTER JOIN (not natively supported, simulated using UNION of LEFT and RIGHT joins)
export const fullJoin = async (req, res) => {
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

    res.json(fullJoinResult);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
