import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
config();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Define User model with timestamps
const User = sequelize.define(
  'User',
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 120,
      },
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100],
      },
    },
    user_image: {
      type: DataTypes.STRING, // Store only the filename, not the full path
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

sequelize.sync();

export default User;
