const logger = (req, res, next) => {
    const hora = new Date().toISOString();
    console.log(`[${hora}] ${req.method} ${req.originalUrl}`);
    next();
}

module.exports = logger;