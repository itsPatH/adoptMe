import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'AdoptMe API',
      version: '1.0.0',
      description: 'API para la gestión de adopciones de mascotas',
    },
    servers: [{ 
      url: process.env.NODE_ENV === "prod" 
             ? "https://adoptme-wrun.onrender.com/api" 
             : "http://localhost:8080/api"}
             
    ],
  },
  apis: ["./src/docs/**/*.yaml", "./src/routes/*.js"],
};
const specs = swaggerJsDoc(options);

export { swaggerUi, specs }; 
