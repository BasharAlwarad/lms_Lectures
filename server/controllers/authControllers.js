import User from '../models/user.js';

// Create new user
export const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const login = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { user_email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    if (user_password !== user.user_password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.user_email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
