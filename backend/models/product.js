const mongoose = require('mongoose');
const detalleSchema = new mongoose.Schema({
    label: { type: String, trim: true },
    value: { type: String, trim: true }
}, { _id: false });

const productSchema = new mongoose.Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'El stock no puede ser negativo']
    },
    imagen: {
        type: String,
        trim: true
    },
    destacado: {
        type: Boolean,
        default: false
    },
    detalles: {
        type: [detalleSchema],
        default: []
    }
}, {timestamps: true });

module.exports = mongoose.model('Product', productSchema);