import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Define User model with timestamps
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

sequelize
  .sync({ force: true })
  .then(() => console.log('✅ Database synced (force: true)'))
  .catch((err) => console.error('❌ Sync failed:', err));

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Users API!' });
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new user
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.params.id } });
    const updatedUser = await User.findByPk(req.params.id);
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
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
