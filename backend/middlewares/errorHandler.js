const errorHandler = (err, req, res, next) => {
    console.error('Error capturado:', err.message);
    const status = err.status || 500;
    const response = {
        message: err.message || 'error del servidor',
    };

    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    };

    res.status(status).json({ error: response });
};

module.exports = errorHandler;