import dotenv from "dotenv";
import logger from "../services/logger.js";

// Determina el entorno: 'development' o 'production'
const ENV = process.env.NODE_ENV || "production";

// Define la ruta del archivo .env según el entorno
const envPath = ENV === "development" ? "./.env.dev" : "./.env.prod";

// Carga variables de entorno
dotenv.config({ path: envPath });

// Validación básica de variables críticas
if (!process.env.MONGO_URL) {
  logger.fatal("❌ MONGO_URL no definida en el entorno.");
  process.exit(1);
}
if (!process.env.JWT_KEY) {
  logger.fatal("❌ JWT_KEY no definida en el entorno.");
  process.exit(1);
}
if (!process.env.PORT) {
  logger.warn("⚠️ PORT no definida. Usando 8080 por defecto.");

}

// Exporta configuración centralizada
export default {
  env: ENV,
  app: {
    MONGO: { URL: process.env.MONGO_URL },
    JWT: { KEY: process.env.JWT_KEY },
    PORT: process.env.PORT || 8080,
  },
};
