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

// Rutas
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error handler (al final)
app.use(errorHandler);

// ------------------------
// MongoDB
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
