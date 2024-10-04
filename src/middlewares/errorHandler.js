const errorHandler = (err, req, res, next) => {
    console.error(err); 
    const statusCode = err.status || 500; 
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;