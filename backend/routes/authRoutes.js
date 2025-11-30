const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/registro", register);
router.post("/login", login);
router.get("/perfil", authMiddleware, getProfile);

module.exports = router;