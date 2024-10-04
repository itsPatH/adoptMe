import { faker } from '@faker-js/faker';

export const generatePets = (numPets) => {
    const pets = [];

    for (let i = 0; i < numPets; i++) {
        const specie = faker.helpers.arrayElement([
            'dog',
            'cat',
            'rabbit',
            'bird',
        ]);

        let name;

        switch (specie) {
            case 'dog':
                name = faker.animal.dog();
                break;
            case 'cat':
                name = faker.animal.cat();
                break;
            case 'rabbit':
                name = faker.animal.rabbit();
                break;
            case 'bird':
                name = faker.animal.bird();
                break;
        }

        const pet = {
            name,
            specie,
            adopted: false,
            owner: null,
        };

        pets.push(pet);
    }

    console.log('Generated pets:', pets);
    return pets;
};