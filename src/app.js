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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || config.mongo.URL);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

connectDB();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

const server = app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
