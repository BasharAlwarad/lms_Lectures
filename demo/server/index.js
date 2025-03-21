import { createServer } from 'http';
import { parse } from 'url';
import db from './db.js';

const server = createServer(async (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;

  // Get all users
  if (req.method === 'GET' && pathname === '/users') {
    try {
      const result = await db.query('SELECT * FROM users');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Database error: ' + err.message);
    }
  }

  // Get user by ID
  else if (req.method === 'GET' && pathname.startsWith('/users/')) {
    const userId = pathname.split('/')[2]; // Extract ID from URL
    try {
      const result = await db.query('SELECT * FROM users WHERE id = $1', [
        userId,
      ]);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Database error: ' + err.message);
    }
  }

  // Search users by first_name, last_name, or age
  else if (req.method === 'GET' && pathname === '/search') {
    const column = query.column; // Column name (first_name, last_name, or age)
    const value = query.value; // Search value
    try {
      const result = await db.query(
        `SELECT * FROM users WHERE ${column} = $1`,
        [value]
      );
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Database error: ' + err.message);
    }
  }

  // Add a new user
  else if (req.method === 'POST' && pathname === '/users') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const { first_name, last_name, age } = JSON.parse(body);
        await db.query(
          'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3)',
          [first_name, last_name, age]
        );
        res.writeHead(201, { 'Content-Type': 'text/plain' });
        res.end('User added successfully!');
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Database error: ' + err.message);
      }
    });
  }

  // Update a user by ID
  else if (req.method === 'PUT' && pathname.startsWith('/users/')) {
    const userId = pathname.split('/')[2];
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const { first_name, last_name, age } = JSON.parse(body);
        const result = await db.query(
          'UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *',
          [first_name, last_name, age, userId]
        );
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.rows));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Database error: ' + err.message);
      }
    });
  }

  // Delete a user by ID
  else if (req.method === 'DELETE' && pathname.startsWith('/users/')) {
    const userId = pathname.split('/')[2];

    try {
      // Delete related orders first
      await db.query('DELETE FROM orders WHERE user_id = $1', [userId]);

      // Now delete the user
      const result = await db.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [userId]
      );
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Database error: ' + err.message);
    }
  }

  // Not Found
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
