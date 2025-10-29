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
import cors from 'cors';

dotenv.config();

const app = express();

// ⚙️ Render usa process.env.PORT automáticamente
const PORT = process.env.PORT || config.app.PORT || 8080;

// Conexión a MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URL || config.app.MONGO.URL;

    if (!mongoURI) throw new Error("Falta la variable MONGO_URL");

    await mongoose.connect(mongoURI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
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

//CORS
const allowedOrigins = [
  'https://adoptme-wrun.onrender.com',
];

app.use(cors({
  origin: function(origin, callback){
    // Permite requests sin origen (por ejemplo Postman o cURL)
    if(!origin) return callback(null, true);

    if(allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));