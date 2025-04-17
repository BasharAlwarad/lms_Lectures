import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import './db/db.js';

import userRoutes from './routes/userRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MODE = process.env.MODE;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use(`/api/v1/users`, userRoutes);

app.get(/.*/, (req, res) => {
  res.status(404).send("Page doesn't exist");
});
app.listen(PORT, () => {
  console.log(`Server is 🏃 in ${MODE} mode on ${PORT}`);
});
