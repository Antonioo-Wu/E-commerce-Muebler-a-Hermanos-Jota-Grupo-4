module.exports = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({msg: "no autenticado"});
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({msg: "se requiere rol admin para acceder"});
        }

        return next();
    } catch (err) {
        console.error("adminGuard error:", err);
        return res.status(500).json({ msg: "error del servidor en adminGuard "});
    }
};