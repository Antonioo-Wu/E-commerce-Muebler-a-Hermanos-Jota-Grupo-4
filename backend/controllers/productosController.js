const Product = require("../models/product");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { getPublicIdFromUrl } = require("../utils/cloudinary");

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
    res.status(500).json({
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
};

const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalido" });
    }
    const producto = await Product.findById(id);
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    const obj = producto.toObject();
    obj.id = obj._id;
    res.json(obj);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el producto", error: error.message });
  }
};

const createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, destacado, detalles, stock } =
      req.body;
    let imagen = "";
    if (req.file) {
      imagen = req.file.path; // URL de Cloudinary
    }
    let parsedDetalles = [];
    if (detalles) {
      if (typeof detalles === "string") {
        parsedDetalles = JSON.parse(detalles);
      } else {
        parsedDetalles = detalles;
      }
    }
    const newProduct = new Product({
      nombre,
      descripcion,
      imagen,
      precio,
      destacado,
      detalles: parsedDetalles,
      stock,
    });
    const saved = await newProduct.save();
    const obj = saved.toObject();
    obj.id = obj._id;
    res.status(201).json(obj);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el producto", error: error.message });
  }
};

const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalido" });
    }
    const updates = { ...req.body };

    if (updates.detalles) {
      try {
        if (typeof updates.detalles === "string") {
          updates.detalles = JSON.parse(updates.detalles);
        }
      } catch (err) {}
    }

    if (req.file) {
      // Si ya habia una imagen almacenada, la borro de cloudinary
      try {
        const existing = await Product.findById(id).lean();
        if (existing && existing.imagen) {
          const publicId = getPublicIdFromUrl(existing.imagen);
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        }
      } catch (err) {
        console.error("Error eliminando imagen previa de Cloudinary:", err);
      }

      updates.imagen = req.file.path;
    }
    const updated = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Producto no encontrado" });
    const obj = updated.toObject();
    obj.id = obj._id;
    res.json(obj);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID ivnalido" });
    }
    // Buscar el producto y eliminar la imagen de cloudinary primero
    const producto = await Product.findById(id);
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });

    if (producto.imagen) {
      try {
        const url = producto.imagen;
        const parts = url.split("/upload/");
        const publicId = getPublicIdFromUrl(producto.imagen);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (err) {
        console.error(
          "Error eliminando imagen de Cloudinary al borrar producto:",
          err
        );
        // si no se pudo eliminar la imagen de cloudinary, elimino el producto de igual forma
      }
    }

    const deleted = await Product.findByIdAndDelete(id);
    res.json({ message: "Producto eliminado", id: deleted._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: error.message });
  }
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
