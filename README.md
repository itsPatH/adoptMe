# AdoptMe
AdoptMe is a backend application designed to manage pet adoptions. It provides a set of endpoints for handling users, pets, adoption lists, and related data.

## Technologies Used
    Node.js
    Express
    MongoDB
    Docker
    Swagger
    Mocha y Chai
    JWT
    Bcrypt
    Multer
    Faker

## Requirements
    Node.js (minimum recommended version: 14)
    Docker and Docker Compose
    MongoDB (local or cloud instance, such as MongoDB Atlas)

## Docker Image
You can find the Docker image for AdoptMe on Docker Hub:

## Deployment
Run the application in Docker:
```bash
docker run -p 8080:8080 itsPath/adoptme
```
## Installation
    Clone the project repository:
```bash
git clone https://github.com/itsPatH/AdoptMe.git
cd AdoptMe
```
    Install dependencies:
```bash
npm install
```
    Create a .env file in the root directory and configure the required environment variables.
## Available Endpoints
| Method | Endpoint             | Description                                 |
|--------|----------------------|---------------------------------------------|
| GET    | /adoptions           | Retrieve all adoptions                      |
| GET    | /adoptions/:aid      | Retrieve adoption by ID                     |
| POST   | /adoptions/:uid/:pid | Create a new adoption                       |
| GET    | /pets                | Retrieve all pets                           |
| POST   | /pets                | Create a new pet                            |
| PUT    | /pets/:pid           | Update pet details by ID                    |
| DELETE | /pets/:pid           | Delete a pet by ID                          |
| GET    | /users               | Retrieve all users                          |
| POST   | /users               | Create a new user                           |
| PUT    | /users/:uid          | Update user details by ID                   |
| DELETE | /users/:uid          | Delete a user by ID                         |
| GET    | /mockingusers        | Generate 50 fake users for testing purposes |
| GET    | /mockingpets         | Generate 10 fake pets for testing purposes  |
| POST   | /generateData        | Generate mock data for users and pets       |

## License
This project is licensed under the MIT License.
[MIT](https://choosealicense.com/licenses/mit/)
