import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
config();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Define Order model with a foreign key reference to User
const Order = sequelize.define(
  'Order',
  {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Refers to the users table
        key: 'id', // Links to the id column in the users table
      },
      onUpdate: 'CASCADE', // If a user's ID changes, update it in orders automatically
      onDelete: 'CASCADE', // If a user is deleted, delete their orders as well
    },
  },
  {
    tableName: 'orders',
    timestamps: true, // Automatically adds created_at and updated_at
    underscored: true, // Uses snake_case column names
  }
);

// Sync models
sequelize.sync();

export default Order;
