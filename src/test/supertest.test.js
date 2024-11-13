import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('AdoptMe API Tests', () => {
    describe('Adoptions Endpoints', () => {
        it('GET /adoptions - Should retrieve all adoptions', async () => {
            const response = await requester.get('/api/adoptions/');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.payload).to.be.an('array');
        });

        it('GET /adoptions/:aid - Should retrieve an adoption by ID', async () => {
            const adoptionId = '673096f40f50baab1e0e3b7c';
            const response = await requester.get(`/api/adoptions/${adoptionId}`);
            if (response.status === 404) {
                expect(response.body).to.have.property('error', 'Adoption not found');
            } else {
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.have.property('_id', adoptionId);
            }
        });
    });

    describe('Pets Endpoints', () => {
        it('GET /pets - Should retrieve all pets', async () => {
            const response = await requester.get('/api/pets');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('payload').that.is.an('array');
        });

        it('POST /pets - Should create a new pet', async () => {
            const newPet = { name: 'Firulais', specie: 'Dog', birthDate: '2020-01-01' };
            const response = await requester.post('/api/pets').send(newPet);
            expect(response.status).to.equal(200);
            expect(response.body.payload).to.have.property('_id');
        });

        it('PUT /pets/:pid - Should update a pet', async () => {
            const petId = '66feb5805cb2b9be9779b97f';
            const updateData = { name: 'Firulais Updated' };
            const response = await requester.put(`/api/pets/${petId}`).send(updateData);
            expect(response.status).to.equal(200);
        });

        it('DELETE /pets/:pid - Should delete a pet', async () => {
            const petId = '66feb5a5a3053e04fa146f99';
            const response = await requester.delete(`/api/pets/${petId}`);
            expect(response.status).to.equal(200);
        });
    });

    describe('Users Endpoints', () => {
        it('GET /users - Should retrieve all users', async () => {
            const response = await requester.get('/api/users');
            expect(response.status).to.equal(200);
            expect(response.body.payload).to.be.an('array');
        });

        it('GET /users/:uid - Should retrieve a user by ID', async () => {
            const userId = '66fd5e6f760839f44ce5d564';
            const response = await requester.get(`/api/users/${userId}`);
            if (response.status === 404) {
                expect(response.body).to.have.property('error', 'User not found');
            } else {
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.have.property('_id', userId);
            }
        });

        it('PUT /users/:uid - Should update a user', async () => {
            const userId = '66fd5e6f760839f44ce5d573';
            const updateData = { firstName: 'Isabel' };
            const response = await requester.put(`/api/users/${userId}`).send(updateData);
            expect(response.status).to.equal(200);
        });
    });

    describe('Sessions Endpoints', () => {
        it('POST /sessions/login - Should log in', async () => {
            const loginData = { email: 'john@example.com', password: '123456' };
            const response = await requester.post('/api/sessions/login').send(loginData);
            expect(response.status).to.equal(200);
        });
    });

    describe('Mocking Data Endpoints', () => {
        it('GET /adoptions/mockingpets - Should retrieve mock pets', async () => {
            const response = await requester.get('/api/mocks/mockingpets');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });

        it('POST /adoptions/generateData - Should generate mock data', async () => {
            const mockData = { users: 5, pets: 10 };
            const response = await requester.post('/api/mocks/generateData').send(mockData);
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Data generated successfully');
        });
    });
});
