import logger from '../services/logger.js'; 
import CustomError from '../utils/CustomError.js';

const errorHandler = (err, req, res, next) => {
    
    if (err instanceof CustomError) {
        logger.warning(`[CustomError] Status: ${err.status}, Name: ${err.name}, Message: ${err.message}, Cause: ${err.cause}`);
        return res.status(err.status).json({
            status: 'error',
            error: err.name,
            message: err.message,
            details: err.cause,
        });
    }


    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        logger.warning(`[JWT Error] ${err.message}`);
        return res.status(401).json({
            status: 'error',
            message: 'Authentication error: Invalid or expired token.',
        });
    }

    logger.error(`[UnhandledError] ${err.stack || err.message}`);
    
    const statusCode = err.status || 500; 
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;