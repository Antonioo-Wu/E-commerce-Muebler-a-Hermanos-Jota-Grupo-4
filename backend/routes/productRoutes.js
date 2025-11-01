const express = require('express');
const router = express.Router();
const {
	getProductos,
	getProductoById,
	createProducto,
	updateProducto,
	deleteProducto,
} = require('../controllers/productosController');

// Obtener todos los productos
router.get('/', getProductos);

// Obtener un producto por id
router.get('/:id', getProductoById);

// Crear un nuevo producto
router.post('/', createProducto);

// Actualizar un producto existente
router.put('/:id', updateProducto);

// Eliminar un producto 
router.delete('/:id', deleteProducto);

module.exports = router;
