const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} = require("../controllers/productosController");

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Obtener todos los productos
router.get("/", getProductos);

// Obtener un producto por id
router.get("/:id", getProductoById);

// Crear un nuevo producto
router.post("/", upload.single("imagen"), createProducto);

// Actualizar un producto existente
router.put("/:id", updateProducto);

// Eliminar un producto
router.delete("/:id", deleteProducto);

module.exports = router;
