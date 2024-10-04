import express from 'express';
import { generatePets } from '../mocks/mockingPets.js';
import { generateUsers } from '../mocks/mockingUsers.js';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';

const router = express.Router();

router.get('/mockingpets', (req, res) => {
    const pets = generatePets(100);
    res.status(200).json(pets);
});

router.get('/mockingusers', (req, res) => {
    const users = generateUsers(50);
    res.status(200).json(users);
});

router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets) {
        return res
            .status(400)
            .json({ error: 'Both "users" and "pets" parameters are required' });
    }

    try {
        const generatedUsers = generateUsers(users);
        const generatedPets = generatePets(pets);
        const insertedUsers = await User.insertMany(generatedUsers);
        const insertedPets = await Pet.insertMany(generatedPets);

        res.json({
            message: 'Data generated successfully',
            insertedUsers: insertedUsers.length,
            insertedPets: insertedPets.length,
        });
    } catch (error) {
        console.error('Error generating or inserting data:', error); 
        res.status(500).json({
            error: 'Error generating or inserting data',
            details: error.message,
        });
    }
});

export default router;