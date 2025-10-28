import Pet from '../dao/models/Pet.js';

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Gestión de mascotas
 */
const getAllPets = async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
};

const getPet = async (req, res) => {
  const { pid } = req.params;
  const pet = await Pet.findById(pid);
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  res.json(pet);
};

const createPet = async (req, res) => {
  const pet = await Pet.create(req.body);
  res.status(201).json(pet);
};

const updatePet = async (req, res) => {
  const { pid } = req.params;
  const pet = await Pet.findByIdAndUpdate(pid, req.body, { new: true });
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  res.json(pet);
};

const deletePet = async (req, res) => {
  const { pid } = req.params;
  const pet = await Pet.findByIdAndDelete(pid);
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  res.json({ message: 'Pet deleted' });
};

export default {
  getAllPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
};
