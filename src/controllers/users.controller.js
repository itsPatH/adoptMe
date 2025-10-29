import User from '../dao/models/User.js';
import bcrypt from 'bcryptjs';

const saltRounds = 10;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // no enviar contraseña
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, last_name, email, password, role } = req.body;

    if (!name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      last_name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await newUser.save();
    const userResponse = { ...newUser.toObject() };
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, last_name, email, password, role } = req.body;
    const updateData = { name, last_name, email, role };

    if (password) {
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.uid,
      updateData,
      { new: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.uid);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
