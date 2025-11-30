const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    createPedido,
    getUserPedidos,
    getPedidoById
} = require('../controllers/pedidoController');

// Rutas protegidas 
router.post('/', authMiddleware, createPedido);
router.get('/mis-pedidos', authMiddleware, getUserPedidos);
router.get('/:id', authMiddleware, getPedidoById);

module.exports = router;