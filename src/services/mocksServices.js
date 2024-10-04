import bcrypt from "bcrypt"
import { faker } from '@faker-js/faker';

export const generateMockUsers = async (count) => {
    const users = [];
    const roles = ['user', 'admin'];
    const passwordHash = await bcrypt.hash('coder123', 10);

    for (let i = 0; i < count; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: passwordHash,
            role: faker.helpers.arrayElement(roles),
            pets: [],
        });
    }

    return users;
};

export const generateMockPets = async (count) => {
    const pets = [];
    const types = ['cat', 'dog', 'fish', 'bird'];

    for (let i = 0; i < count; i++) {

        const thisType = faker.helpers.arrayElement(types)

        const petBreed = (thisType == "cat") ? faker.animal.cat() :
                     (thisType == "dog") ? faker.animal.dog() :
                     (thisType == "fish") ? faker.animal.fish() :
                     (thisType == "bird") ? faker.animal.bird() : undefined

        const petName = faker.person.firstName()

        pets.push({
            name: petName,
            specie: thisType,
            breed: petBreed,
            birthDate: faker.date.birthdate().toISOString(),
            adopted: false,
            owner: null
        });
    }

    return pets;
};