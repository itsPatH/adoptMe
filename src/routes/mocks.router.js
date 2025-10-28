import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

/**
 * @swagger
 * /mocks/mockingusers:
 *   get:
 *     summary: Generate 50 fake users
 *     tags:
 *       - Mocks
 *     responses:
 *       200:
 *         description: List of fake users
 */
router.get('/mockingusers', mocksController.generateMockUsers);

/**
 * @swagger
 * /mocks/mockingpets:
 *   get:
 *     summary: Generate 100 fake pets
 *     tags:
 *       - Mocks
 *     responses:
 *       200:
 *         description: List of fake pets
 */
router.get('/mockingpets', mocksController.generateMockPets);

/**
 * @swagger
 * /mocks/generateData:
 *   post:
 *     summary: Generate fake users and pets in the DB
 *     tags:
 *       - Mocks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: integer
 *               pets:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Data generated
 */
router.post('/generateData', mocksController.generateData);

export default router;
