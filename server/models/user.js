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
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

sequelize.sync();

// TODO:not important
// sequelize
//   .sync({ force: true })
//   .then(() => console.log('✅ Database synced (force: true)'))
//   .catch((err) => console.error('❌ Sync failed:', err));

export default User;
