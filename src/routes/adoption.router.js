import { Router } from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

/**
 * @swagger
 * /adoptions:
 *   get:
 *     summary: Get all adoptions
 *     tags:
 *       - Adoptions
 *     responses:
 *       200:
 *         description: List of adoptions
 */
router.get('/', adoptionsController.getAllAdoptions);

/**
 * @swagger
 * /adoptions/{aid}:
 *   get:
 *     summary: Get an adoption by ID
 *     tags:
 *       - Adoptions
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adoption found
 */
router.get('/:aid', adoptionsController.getAdoption);

/**
 * @swagger
 * /adoptions/{uid}/{pid}:
 *   post:
 *     summary: Create a new adoption
 *     tags:
 *       - Adoptions
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Adoption created
 */
router.post('/:uid/:pid', adoptionsController.createAdoption);

export default router;
