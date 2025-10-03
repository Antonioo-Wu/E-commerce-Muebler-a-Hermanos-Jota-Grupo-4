const productos = require('../data/productos');

const getProductos = async (req, res) => {
    try {
        res.json(productos);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los productos',
            error: error.message
        });
    }
};

const getProductoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'El ID debe ser un número válido'
            });
        }

        const producto = productos.find(p => p.id === id);
        
        if (!producto) {
            return res.status(404).json({ 
                message: `Producto con ID ${id} no encontrado`
            });
        }
        
        res.json(producto);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el producto',
            error: error.message
        });
    }
};

module.exports = {
    getProductos,
    getProductoById
};
