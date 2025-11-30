const Pedido = require('../models/pedido');
const Product = require('../models/product');

const createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ 
                msg: 'El pedido debe contener al menos un producto' 
            });
        }

        const orderItems = [];
        let total = 0;

        for (const item of items) {
            const { productId, cantidad } = item;

            if (!productId || !cantidad || cantidad <= 0) {
                return res.status(400).json({ 
                    msg: 'Datos de producto inválidos' 
                });
            }

            const producto = await Product.findById(productId);
            if (!producto) {
                return res.status(404).json({ 
                    msg: `Producto con ID ${productId} no encontrado` 
                });
            }

            if (producto.stock < cantidad) {
                return res.status(400).json({ 
                    msg: `Stock insuficiente para ${producto.nombre}. Stock disponible: ${producto.stock}` 
                });
            }

            const orderItem = {
                producto: producto._id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: cantidad,
                imagen: producto.imagen
            };

            orderItems.push(orderItem);
            total += producto.precio * cantidad;
        }

        const newPedido = new Pedido({
            usuario: userId,
            items: orderItems,
            total: total
        });

        await newPedido.save();

        for (const item of orderItems) {
            await Product.findByIdAndUpdate(
                item.producto,
                { $inc: { stock: -item.cantidad } }
            );
        }

        const populatedPedido = await Pedido.findById(newPedido._id)
            .populate('usuario', 'nombre email')
            .populate('items.producto', 'nombre precio imagen');

        res.status(201).json({
            msg: 'Pedido creado exitosamente',
            pedido: populatedPedido
        });

    } catch (error) {
        console.error('Error creando pedido:', error);
        res.status(500).json({ 
            msg: 'Error del servidor al crear el pedido' 
        });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const pedidos = await Pedido.find({ usuario: userId })
            .populate('items.producto', 'nombre precio imagen')
            .sort({ createdAt: -1 });

        res.json({
            pedidos: pedidos
        });

    } catch (error) {
        console.error('Error obteniendo pedidos:', error);
        res.status(500).json({ 
            msg: 'Error del servidor al obtener los pedidos' 
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const pedido = await Pedido.findOne({ _id: id, usuario: userId })
            .populate('usuario', 'nombre email')
            .populate('items.producto', 'nombre precio imagen descripcion');

        if (!pedido) {
            return res.status(404).json({ 
                msg: 'Pedido no encontrado' 
            });
        }

        res.json({
            pedido: pedido
        });

    } catch (error) {
        console.error('Error obteniendo pedido:', error);
        res.status(500).json({ 
            msg: 'Error del servidor al obtener el pedido' 
        });
    }
};

module.exports = {
    createPedido: createOrder,
    getUserPedidos: getUserOrders,
    getPedidoById: getOrderById
};