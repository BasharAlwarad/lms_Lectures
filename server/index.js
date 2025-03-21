import express from 'express';
import db from './db.js';
import { config } from 'dotenv';

const app = express();
const PORT = process.env.PORT || 8080;
config();
app.use(express.json());

// Get default route
app.get('/', async (req, res) => {
  try {
    res.json({ message: 'Welcome to the Users API!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.send(err.message);
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    res.send(err.message);
  }
});

app.get('/search', async (req, res) => {
  const { column, value } = req.query;
  try {
    const result = await db.query(`SELECT * FROM users WHERE ${column} = $1`, [
      value,
    ]);
    res.json(result.rows);
  } catch (err) {
    res.send(err.message);
  }
});

// Add a new user
app.post('/users', async (req, res) => {
  const { first_name, last_name, age } = req.body;
  try {
    await db.query(
      'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3)',
      [first_name, last_name, age]
    );
    res.send('User added successfully!');
  } catch (err) {
    res.send(err.message);
  }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;
  try {
    const result = await db.query(
      'UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *',
      [first_name, last_name, age, id]
    );
    res.json(result.rows);
  } catch (err) {
    res.send(err.message);
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM orders WHERE user_id = $1', [id]); // Delete related orders first
    const result = await db.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.send(err.message);
  }
});

// Handle 404 errors
app.use((req, res) => {
  res.send('Not Found');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
