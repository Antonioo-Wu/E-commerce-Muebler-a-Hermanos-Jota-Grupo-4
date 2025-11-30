require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
    try {
        const { nombre, email, password, role } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ msg: "datos incompletos" });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "email ya registrado" });

        // Validar rol si se proporciona
        const validRoles = ["user", "admin"];
        const userRole = role && validRoles.includes(role) ? role : "user";

        const hashed = await bcrypt.hash(password, 10);

        await User.create({
            nombre,
            email,
            password: hashed,
            role: userRole
        });

        return res.status(201).json({ 
            msg: "usuario registrado",
            role: userRole
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "error del servidor" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ msg: "datos incompletos"});

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: "credenciales invalidas" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json({msg: "credenciales invalidas"});

        const payload = {
            id: user._id,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d"
        });
        
        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({msg: "error del servidor"});
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor" });
    }
};

module.exports = { register, login, getProfile };