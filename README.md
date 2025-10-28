# ADOPT ME
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

<p align="center">
  <a href="#español"> Español</a> |
  <a href="#english"> English</a>
</p>

## Español <a name="español"></a>
## Índice
* [Descripción](#descripción)
* [Stack](#stack)
* [Requerimientos](#requerimientos)
* [Instalación](#instalación)
* [EndPoints](#endpoints)
* [Licencia](#licencia)

## Descripción
AdoptMe es una aplicación backend diseñada para gestionar adopciones de mascotas. Proporciona un conjunto de endpoints para manejar usuarios, mascotas, listas de adopción y datos relacionados.
## Stack
| **Capa**                | **Tecnología**              | **Características Clave Demostradas**                                                                                   |
| :---------------------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **Back-end**            | **Node.js con Express**     | Arquitectura **RESTful**, manejo de rutas modulares y controladores para la gestión de usuarios, mascotas y adopciones. |
| **Base de Datos**       | **MongoDB (Mongoose ODM)**  | Modelado flexible de documentos, integración fluida con Node.js y consultas optimizadas.                                |
| **Autenticación**       | **JWT (JSON Web Tokens)**   | Protección de endpoints mediante **tokens firmados** y sesiones seguras.                                                |
| **Seguridad**           | **Bcrypt**                  | Cifrado robusto de contraseñas y validación de credenciales en procesos de login y registro.                            |
| **Documentación API**   | **Swagger**                 | Generación automática y visualización interactiva de endpoints para pruebas y validación.                               |
| **Testing**             | **Mocha y Chai**            | Implementación de **tests unitarios y de integración** para validar flujos críticos de negocio.                         |
| **Gestión de Archivos** | **Multer**                  | Middleware para la **carga y manejo de imágenes de mascotas**, con validaciones de tipo y tamaño.                       |
| **Datos Mock**          | **Faker.js**                | Generación de datos simulados (usuarios y mascotas) para pruebas y desarrollo.                                          |
| **Contenedorización**   | **Docker y Docker Compose** | Empaquetado y despliegue reproducible del entorno backend con configuración aislada.                                    |

## Requerimientos
## Requerimientos
- **Node.js (v14 o superior):** motor para ejecutar el servidor.
- **MongoDB:** base de datos NoSQL; puedes usar una instancia local o un servicio en la nube como [MongoDB Atlas](https://www.mongodb.com/atlas).
- **Docker y Docker Compose (opcional):** si prefieres ejecutar la app contenedorizada.

  ## Instalación
1. Clona el repositorio:
```bash
   git clone https://github.com/itsPatH/adoptMe.git
```
3. Instala las dependencias:
```bash
   npm install
   #or
   pnpm install
   #or
   yarn install
```
4. Crea un archivo .env en el directorio raíz y configura las variables de entorno requeridas.
```bash
PORT=8080
MONGO_URL="mongodb://localhost:27017/adoptme_db"
JWT_SECRET="tu_clave_secreta_jwt"
ADMIN_PASSWORD="una_clave_segura_para_usuario_admin"
```
*Si usas MongoDB Atlas, reemplaza mongodb://localhost:27017/adoptme_db por la URI de conexión que te proporciona Atlas.*
5. Correr el proyecto:
```bash
npm run dev     # Modo desarrollo
npm run start   # Modo producción
```
###  Documentación Swagger
Una vez el servidor esté corriendo, puedes acceder a la documentación interactiva:
[http://localhost:8080/api/docs](http://localhost:8080/api/docs)


## Endpoints
### Formato base de la API:
```bash
Base URL: `http://localhost:8080/api`
```

| Método     | Endpoint               | Descripción                                   |
| ---------- | ---------------------- | --------------------------------------------- |
| **GET**    | `/adoptions`           | Obtiene todas las adopciones                  |
| **GET**    | `/adoptions/:aid`      | Obtiene una adopción por ID                   |
| **POST**   | `/adoptions/:uid/:pid` | Crea una nueva adopción                       |
| **GET**    | `/pets`                | Obtiene todas las mascotas                    |
| **POST**   | `/pets`                | Crea una nueva mascota                        |
| **PUT**    | `/pets/:pid`           | Actualiza los datos de una mascota por ID     |
| **DELETE** | `/pets/:pid`           | Elimina una mascota por ID                    |
| **GET**    | `/users`               | Obtiene todos los usuarios                    |
| **POST**   | `/users`               | Crea un nuevo usuario                         |
| **PUT**    | `/users/:uid`          | Actualiza los datos de un usuario por ID      |
| **DELETE** | `/users/:uid`          | Elimina un usuario por ID                     |
| **GET**    | `/mockingusers`        | Genera 50 usuarios falsos para pruebas        |
| **GET**    | `/mockingpets`         | Genera 10 mascotas falsas para pruebas        |
| **POST**   | `/generateData`        | Genera datos ficticios de usuarios y mascotas |


## Licencia
Este proyecto está licenciado bajo los términos de la licencia MIT. Para más detalles, consulta el archivo [LICENSE.md](LICENSE.md).


---
## 🇬🇧 English <a name="english"></a>
## Index
* [Description](#description)
* [Stack](#stack)
* [Requirements](#requirements)
* [Installation](#installation)
* [EndPoints](#endpoints)
* [License](#license)

## Description
AdoptMe is a backend application designed to manage pet adoptions. It provides a set of endpoints for handling users, pets, adoption lists, and related data.

## Stack
| **Layer**                | **Technology**              | **Key Features Demonstrated**                                                                   |
| :----------------------- | :-------------------------- | :---------------------------------------------------------------------------------------------- |
| **Back-end**             | **Node.js with Express**    | RESTful architecture, modular routing, and controllers for managing users, pets, and adoptions. |
| **Database**             | **MongoDB (Mongoose ODM)**  | Flexible document modeling, seamless Node.js integration, and optimized querying.               |
| **Authentication**       | **JWT (JSON Web Tokens)**   | Secured endpoints with **signed tokens** and robust session management.                         |
| **Security**             | **Bcrypt**                  | Strong password hashing and credential validation for login and registration flows.             |
| **API Documentation**    | **Swagger**                 | Automated generation and interactive visualization of endpoints for testing and validation.     |
| **Testing**              | **Mocha & Chai**            | Implementation of **unit and integration tests** to ensure business logic reliability.          |
| **File Management**      | **Multer**                  | Middleware for **image uploads and file handling**, including type and size validation.         |
| **Mock Data Generation** | **Faker.js**                | Creation of simulated data (users and pets) for testing and development purposes.               |
| **Containerization**     | **Docker & Docker Compose** | Environment packaging and reproducible backend deployment with isolated configuration.          |


## Requirements
- **Node.js (v14 or higher):** Engine for running the server.
- **MongoDB:** NoSQL database; you can use a local instance or a cloud service like [MongoDB Atlas](https://www.mongodb.com/atlas).
- **Docker and Docker Compose (optional):** if you prefer to run the containerized application.

## Installation
1. Clone the project repository:
```bash
   git clone https://github.com/itsPatH/adoptMe.git
   cd AdoptMe
```
3. Install dependencies:
```bash
   npm install
   #or
   pnpm install
   #or
   yarn install
```
4. Create a .env file in the root directory and configure the required environment variables.
```bash
PORT=8080
MONGO_URL="mongodb://localhost:27017/adoptme_db"
JWT_SECRET="your_jwt_secret_key"
ADMIN_PASSWORD="secure_admin_password"
```
*If you're using MongoDB Atlas, replace the local URI with your Atlas connection string.*
5. Run the app:
```bash
npm run dev     # Dev mode
npm run start   # Prod mode
```
###  Swagger
Once the server is running, you can access the interactive documentation:
[http://localhost:8080/api/docs](http://localhost:8080/api/docs)

## Available Endpoints
Method	Endpoint	Description
GET	/adoptions	Retrieve all adoptions
GET	/adoptions/:aid	Retrieve adoption by ID
POST	/adoptions/:uid/:pid	Create a new adoption
GET	/pets	Retrieve all pets
POST	/pets	Create a new pet
PUT	/pets/:pid	Update pet details by ID
DELETE	/pets/:pid	Delete a pet by ID
GET	/users	Retrieve all users
POST	/users	Create a new user
PUT	/users/:uid	Update user details by ID
DELETE	/users/:uid	Delete a user by ID
GET	/mockingusers	Generate 50 fake users for testing purposes
GET	/mockingpets	Generate 10 fake pets for testing purposes
POST	/generateData	Generate mock data for users and pets

## License
This project is licensed under the MIT License.
[MIT](https://choosealicense.com/licenses/mit/)

