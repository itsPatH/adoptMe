import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';

const router = Router();

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Get all pets
 *     tags:
 *       - Pets
 *     responses:
 *       200:
 *         description: List of pets
 */
router.get('/', petsController.getAllPets);

/**
 * @swagger
 * /pets/{pid}:
 *   get:
 *     summary: Get a pet by ID
 *     tags:
 *       - Pets
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet found
 */
router.get('/:pid', petsController.getPet);

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Create a new pet
 *     tags:
 *       - Pets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pet created
 */
router.post('/', petsController.createPet);

/**
 * @swagger
 * /pets/{pid}:
 *   put:
 *     summary: Update a pet by ID
 *     tags:
 *       - Pets
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pet updated
 */
router.put('/:pid', petsController.updatePet);

/**
 * @swagger
 * /pets/{pid}:
 *   delete:
 *     summary: Delete a pet by ID
 *     tags:
 *       - Pets
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet deleted
 */
router.delete('/:pid', petsController.deletePet);

export default router;
