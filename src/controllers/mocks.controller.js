import { createUsers } from '../mocks/mockingUsers.js';
import { createPets } from '../mocks/mockingPets.js';
import Users from '../dao/Users.dao.js';
import Pet from '../dao/Pets.dao.js';
import { usersService, petsService } from '../services/index.js';


export const mockingPets =  (req, res) => {
    const pets = createPets(100);
    res.status(200).json(pets);
};

export const mockingUsers =  (req, res) => {
    const users = createUsers(50);
    res.status(200).json(users);
}

export const generateData = async (req, res)=>{
   const { users, pets } = req.body
   if(!users || !pets){
    return res
    .status(400)
    .json({ error: 'Both "users" and "pets" parameters are required' });
   }
   if(isNaN(users) || isNaN(pets)){
    return res
    .status(400)
    .json({ error: 'Both "users" and "pets" parameters must be numbers' });
   }

   try {
  
    const createdPets = await createPets(pets);
    const createdUsers = await createUsers(users);

    const insertedUsers = await usersService.insertMany(createdUsers);
    const insertedPets = await petsService.insertMany(createdPets);

  
    res.json({
        message: 'Data generated successfully',
        insertedUsers: insertedUsers.length,
        insertedPets: insertedPets.length,
    });
} catch (error) {
    console.error('Error generating or inserting data:', error);
    res.status(500).json({ error: 'An error occurred while generating or inserting data.' });
}
}
