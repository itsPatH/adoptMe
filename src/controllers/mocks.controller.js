import { generateUsers } from '../mocks/mockingUsers.js';
import { generatePets } from '../mocks/mockingPets.js';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';

/**
 * @swagger
 * tags:
 *   name: Mocks
 *   description: Generación de datos de prueba
 */
const generateMockUsers = (req, res) => {
  const users = generateUsers(50);
  res.status(200).json(users);
};

const generateMockPets = (req, res) => {
  const pets = generatePets(10);
  res.status(200).json(pets);
};

const generateData = async (req, res) => {
  const { users, pets } = req.body;
  if (!users || !pets)
    return res.status(400).json({ error: 'Both "users" and "pets" are required' });

  const generatedUsers = generateUsers(users);
  const generatedPets = generatePets(pets);

  const insertedUsers = await User.insertMany(generatedUsers);
  const insertedPets = await Pet.insertMany(generatedPets);

  res.status(201).json({
    message: 'Data generated successfully',
    insertedUsers: insertedUsers.length,
    insertedPets: insertedPets.length,
  });
};

export default {
  generateMockUsers,
  generateMockPets,
  generateData,
};
