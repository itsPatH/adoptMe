import { config } from "dotenv";
import { Command } from "commander";
import logger from "../services/logger.js";

const appProgram = new Command();

appProgram.requiredOption('-m, --mode <mode>', 'Server mode', 'prod');

appProgram.parse();

const mode = appProgram.opts().mode;

if (mode !== 'dev' && mode !== 'prod') {
  logger.fatal(`Modo no válido: ${mode}. Debe ser 'dev' o 'prod'.`);
  process.exit(1);
}

logger.info(`Modo seleccionado: ${mode}`);

const envPath = mode === 'dev' ? './.env.development' : './.env.production';

config({ path: envPath });

// Agrega la depuración
console.log('MONGO_URL:', process.env.MONGO_URL);
console.log('JWT_KEY:', process.env.JWT_KEY);
console.log('PORT:', process.env.PORT);

export default {
  app: {
    MONGO: {
      URL: process.env.MONGO_URL,
    },
    JWT: {
      KEY: process.env.JWT_KEY,
    },
  },
};