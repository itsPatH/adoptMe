import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import mocksRouter from './routes/mocks.router.js';
import errorHandler from './middlewares/errorHandler.js';
import __dirname from './utils/utils.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import config from './config/config.js';
import logger from './services/logger.js';
import { swaggerUi, specs } from './config/swagger.js';

dotenv.config();

const app = express();

// ⚙️ Render usa process.env.PORT automáticamente
const PORT = process.env.PORT || config.app.PORT || 8080;

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.app.MONGO.URL);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};
connectDB();

// Middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

// 📘 Documentación Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error handler (al final siempre)
app.use(errorHandler);

// Servidor
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📘 Swagger available at /api/docs`);
});
