function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        // Include stack trace only in development environment
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}



module.exports = errorHandler;