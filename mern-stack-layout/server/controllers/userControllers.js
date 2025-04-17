import User from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
export const getUserById = (req, res) => {
  res.json({ message: 'Get one users' });
};
export const createUser = (req, res) => {
  res.json({ message: 'create users' });
};
export const updateUser = (req, res) => {
  res.json({ message: 'update users' });
};
export const deleteUser = (req, res) => {
  res.json({ message: 'delete users' });
};
