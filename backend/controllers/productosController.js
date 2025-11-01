const Product = require('../models/product');
const mongoose = require('mongoose');

const getProductos = async (req, res) => {
        try {
            const productos = await Product.find().sort({ createdAt: -1 });
            const mapped = productos.map((p) => {
                const obj = p.toObject();
                obj.id = obj._id;
                return obj;
            });
            res.json(mapped);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
        }
};

const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID invalido' });
        }
        const producto = await Product.findById(id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    const obj = producto.toObject();
    obj.id = obj._id;
        res.json(obj);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

const createProducto = async (req, res) => {
    try {
        const { nombre, descripcion, imagen, precio, destacado, detalles, stock } = req.body;
        const newProduct = new Product({ nombre, descripcion, imagen, precio, destacado, detalles, stock });
        const saved = await newProduct.save();
        const obj = saved.toObject();
        obj.id = obj._id;
        res.status(201).json(obj);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID invalido' });
        }
        const updates = req.body;
        const updated = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
        const obj = updated.toObject();
        obj.id = obj._id;
        res.json(obj);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID ivnalido' });
        }
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado', id: deleted._id });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
};
