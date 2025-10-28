// src/config/swagger.js
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AdoptMe API',
      version: '1.0.0',
      description: 'API para la gestión de adopciones de mascotas',
    },
    servers: [
      { url: 'http://localhost:8080/api' },
    ],
  },
  apis: ['./src/routes/*.router.js'],
};
const specs = swaggerJsDoc(options);

export { swaggerUi, specs }; 
