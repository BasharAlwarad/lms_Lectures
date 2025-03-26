import User from './user.js';
import Order from './order.js';

// Define associations
User.hasMany(Order, { foreignKey: 'userId' }); // One user can have many orders
Order.belongsTo(User, { foreignKey: 'userId' }); // Each order belongs to one user

export { User, Order };
