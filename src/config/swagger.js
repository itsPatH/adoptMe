// src/config/swagger.js
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const isProd = process.env.NODE_ENV === "production";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Adopt Me API",
      version: "1.0.0",
      description: "API para gestión de adopciones y usuarios"
    },
    servers: [
      {
        url: isProd
          ? "https://adoptme-wrun.onrender.com"
          : "http://localhost:8080"
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};

const specs = swaggerJsDoc(options);

export { swaggerUi, specs };
