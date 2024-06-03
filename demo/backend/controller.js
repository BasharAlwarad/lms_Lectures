import data from './data/data.js';

// GET      All users
const getAllUsers = (req, res) => {
  res.json(data);
};

// GET One user by id

const getUserById = (req, res) => {
  const userId = req.params.id;
  const user = data.find((user) => user.id === +userId);
  res.json(user);
};

// ADD a new user

const addUser = (req, res) => {
  const { name, email } = req.body;

  const userId = data.length > 0 ? data[data.length - 1].id + 1 : 1;

  const newUser = {
    id: userId,
    name,
    email,
  };

  data.push(newUser);

  res.status(201).json(newUser);
};

// DELETE a user
const deleteUserById = (req, res) => {
  const userId = req.params.id;

  const index = data.findIndex((user) => user.id === +userId);

  data.splice(index, 1);

  res.json({ message: 'User deleted successfully' });
};

export { getAllUsers, getUserById, addUser, deleteUserById };
