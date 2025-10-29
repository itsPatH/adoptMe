// src/app.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Command } from "commander";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";

import errorHandler from "./middlewares/errorHandler.js";
import logger from "./services/logger.js";
import __dirname from "./utils/utils.js";
import { swaggerUi, specs } from "./config/swagger.js";

// ------------------------
// Manejo de entornos
// ------------------------
const program = new Command();
program.requiredOption("-m, --mode <mode>", "Server mode", "prod");
program.parse();
const mode = program.opts().mode;

if (!["dev", "prod"].includes(mode)) {
  logger.fatal(`Modo no válido: ${mode}. Debe ser 'dev' o 'prod'.`);
  process.exit(1);
}

// Carga de variables de entorno según modo
dotenv.config({ path: mode === "dev" ? ".env.dev" : ".env.prod" });
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

// ------------------------
// Express App
// ------------------------
const app = express();

// CORS
if (mode === "dev") {
  app.use(cors({ origin: "*" })); // cualquier origen en dev
} else {
  app.use(
    cors({
      origin: ["https://adoptme-wrun.onrender.com"], // dominio de producción
    })
  );
}

// Middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ------------------------
// Rutas con prefijo /api
// ------------------------
const API_PREFIX = "/api";

app.use(`${API_PREFIX}/users`, usersRouter);
app.use(`${API_PREFIX}/pets`, petsRouter);
app.use(`${API_PREFIX}/adoptions`, adoptionsRouter);
app.use(`${API_PREFIX}/sessions`, sessionsRouter);
app.use(`${API_PREFIX}/mocks`, mocksRouter);

// Documentación Swagger
app.use(`${API_PREFIX}/docs`, swaggerUi.serve, swaggerUi.setup(specs));

// ------------------------
// Rutas “limpias” en producción
// ------------------------
if (mode === "prod") {
  app.use("/users", usersRouter);
  app.use("/pets", petsRouter);
  app.use("/adoptions", adoptionsRouter);
  app.use("/sessions", sessionsRouter);
  app.use("/mocks", mocksRouter);
}

// Error handler (al final)
app.use(errorHandler);

// ------------------------
// Conexión a MongoDB
// ------------------------
mongoose
  .connect(MONGO_URL)
  .then(() => logger.info("✅ Conectado a MongoDB"))
  .catch((err) => {
    logger.error("❌ Error conectando a MongoDB:", err);
    process.exit(1);
  });

// ------------------------
// Servidor
// ------------------------
app.listen(PORT, "0.0.0.0", () => {
  logger.info(`🚀 Server running on port ${PORT} (${mode})`);
  logger.info(`📘 Swagger disponible en /api/docs`);
});

export default app;
