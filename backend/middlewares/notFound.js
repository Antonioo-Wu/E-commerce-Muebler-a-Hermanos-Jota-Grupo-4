const notFound = (req, res, next) => {
    res.status(404).json({
        error: 'Ruta no encontrada'
    });
};

module.exports = notFound;