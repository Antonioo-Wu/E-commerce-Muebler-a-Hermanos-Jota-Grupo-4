const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const authMiddleware = require("../middlewares/authMiddleware");
const adminGuard = require("../middlewares/adminGuard");
const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} = require("../controllers/productosController");

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuración de multer para subir imágenes a Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "productos", // Carpeta en Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});
const upload = multer({ storage: storage });

// Rutas públicas - users
router.get("/", getProductos);
router.get("/:id", getProductoById);

// Rutas protegidas - admin
router.post("/", authMiddleware, adminGuard, upload.single("imagen"), createProducto);
router.put("/:id", authMiddleware, adminGuard, upload.single("imagen"), updateProducto);
router.delete("/:id", authMiddleware, adminGuard, deleteProducto);

module.exports = router;
