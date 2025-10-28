import User from '../dao/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Gestión de autenticación
 */

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, config.app.JWT.KEY, { expiresIn: '1h' });
  res.json({ token });
};

const logout = (req, res) => {
  // Si manejas cookies:
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

export default {
  login,
  logout,
};
