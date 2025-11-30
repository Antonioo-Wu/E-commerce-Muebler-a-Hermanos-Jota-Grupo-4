const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({msg: "token no encontrado"});
    }

    const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        return res.status(401).json({msg: "token invalido o expirado"});
    }
};

module.exports = authMiddleware;
