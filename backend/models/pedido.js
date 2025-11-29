const mongoose = require('mongoose');

const pedidoItemSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    imagen: {
        type: String
    }
}, { _id: false });

const pedidoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: [pedidoItemSchema],
        required: true,
        validate: {
            validator: function(items) {
                return items && items.length > 0;
            },
            message: 'El pedido debe tener al menos un item'
        }
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    fechaPedido: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pedido', pedidoSchema);