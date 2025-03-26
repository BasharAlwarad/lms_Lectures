import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'; // Import user routes
import orderRoutes from './routes/orderRoutes.js'; // Import order routes

config(); // Load environment variables

const app = express();
const PORT = process.env.PORT; // Get the port from environment variables

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS to allow cross-origin requests

// Default route (root endpoint)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Use imported routes
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

// Handle 404 errors (for any undefined routes)
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
