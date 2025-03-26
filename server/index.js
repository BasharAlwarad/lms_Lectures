import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import User from './models/user.js'; // Import User model
import Order from './models/order.js'; // Import Order model

config(); // Load environment variables

const app = express();
const PORT = process.env.PORT; // Get the port from environment variables

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS to allow cross-origin requests

// Default route (root endpoint)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

/**
 * ===========================
 *        USER ROUTES
 * ===========================
 */

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message); // Handle errors
  }
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Fetch user by primary key (id)
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' }); // If user not found, return 404
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new user
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body); // Create a new user with provided data
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.params.id } }); // Update user data
    const updatedUser = await User.findByPk(req.params.id); // Fetch updated user
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy(); // Delete user from database
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * ===========================
 *        ORDER ROUTES
 * ===========================
 */

// Get all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll(); // Fetch all orders from the database
    res.json(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get an order by ID
app.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id); // Fetch order by primary key (id)
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' }); // If order not found, return 404
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new order
app.post('/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body); // Create a new order with provided data
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update an order by ID
app.put('/orders/:id', async (req, res) => {
  try {
    await Order.update(req.body, { where: { id: req.params.id } }); // Update order data
    const updatedOrder = await Order.findByPk(req.params.id); // Fetch updated order
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete an order by ID
app.delete('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy(); // Delete order from database
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Handle 404 errors (for any undefined routes)
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
