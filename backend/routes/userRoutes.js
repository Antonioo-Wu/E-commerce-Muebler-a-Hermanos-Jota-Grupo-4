const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/user");

router.get("/perfil", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({msg: "usuario no encontrado"});
        return res.json(user);
    }   catch (error) {
            console.error(error);
            return res.status(500).json({msg: "error del servidor"});
        }
});

module.exports = router;