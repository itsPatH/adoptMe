import Adoption from '../dao/models/Adoption.js';

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Gestión de adopciones
 */
const getAllAdoptions = async (req, res) => {
  const adoptions = await Adoption.find().populate('user pet');
  res.json(adoptions);
};

const getAdoption = async (req, res) => {
  const { aid } = req.params;
  const adoption = await Adoption.findById(aid).populate('user pet');
  if (!adoption) return res.status(404).json({ error: 'Adoption not found' });
  res.json(adoption);
};

const createAdoption = async (req, res) => {
  const { uid, pid } = req.params;
  const adoption = await Adoption.create({ user: uid, pet: pid });
  res.status(201).json(adoption);
};

export default {
  getAllAdoptions,
  getAdoption,
  createAdoption,
};
