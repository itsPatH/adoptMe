import { faker } from '@faker-js/faker';

const testUserController = {
    getTestUser: (req, res) => {
        const testUser = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(10),
        };
        res.send(testUser);
    },
};

export default testUserController;