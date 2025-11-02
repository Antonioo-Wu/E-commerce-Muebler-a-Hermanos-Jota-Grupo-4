const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
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

// Obtener todos los productos
router.get("/", getProductos);

// Obtener un producto por id
router.get("/:id", getProductoById);

// Crear un nuevo producto
router.post("/", upload.single("imagen"), createProducto);

// Actualizar un producto existente (acepta imagen opcional)
router.put("/:id", upload.single("imagen"), updateProducto);

// Eliminar un producto
router.delete("/:id", deleteProducto);

module.exports = router;
