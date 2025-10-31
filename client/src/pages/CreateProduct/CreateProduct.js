import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";

export default function CreateProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    precio: "",
    destacado: false,
    detalles: [{ label: "", value: "" }],
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleDetalleChange = (index, field, value) => {
    const nuevosDetalles = [...formData.detalles];
    nuevosDetalles[index][field] = value;
    setFormData({ ...formData, detalles: nuevosDetalles });
  };

  const agregarDetalle = () => {
    setFormData({
      ...formData,
      detalles: [...formData.detalles, { label: "", value: "" }],
    });
  };

  const eliminarDetalle = (indexAEliminar) => {
    const nuevosDetalles = formData.detalles.filter(
      (_, indiceActual) => indiceActual !== indexAEliminar
    );
    setFormData({ ...formData, detalles: nuevosDetalles });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria.";
    if (!formData.precio || formData.precio <= 0)
      newErrors.precio = "El precio debe ser mayor a 0.";
    if (formData.imagen && !/^https?:\/\/|^\/.*/.test(formData.imagen))
      newErrors.imagen = "Debe ser una URL o ruta válida.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el producto");
      }

      setSuccessMessage("Producto creado con éxito");

      setTimeout(() => navigate("/productos"), 1000);
    } catch (error) {
      console.error(error);
      setErrors({ general: "Hubo un problema al crear el producto." });
    }
  };

  return (
    <div className="crear-producto">
      <h2>Crear nuevo producto</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <span className="error">{errors.nombre}</span>}
        </label>

        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
          {errors.descripcion && (
            <span className="error">{errors.descripcion}</span>
          )}
        </label>

        <label>
          Imagen (URL o ruta):
          <input
            type="text"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
          />
          {errors.imagen && <span className="error">{errors.imagen}</span>}
        </label>

        <label>
          Precio:
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
          />
          {errors.precio && <span className="error">{errors.precio}</span>}
        </label>

        <label>
          Destacado:
          <input
            type="checkbox"
            name="destacado"
            checked={formData.destacado}
            onChange={handleChange}
          />
        </label>

        <h3>Detalles</h3>
        {formData.detalles.map((detalle, index) => (
          <div key={index} className="detalle-item">
            <input
              type="text"
              placeholder="Label"
              value={detalle.label}
              onChange={(e) =>
                handleDetalleChange(index, "label", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Valor"
              value={detalle.value}
              onChange={(e) =>
                handleDetalleChange(index, "value", e.target.value)
              }
              required
            />
            <button
              type="button"
              onClick={() => eliminarDetalle(index)}
              className="eliminar-detalle"
            >
              X
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={agregarDetalle}
          className="agregar-detalle-btn"
        >
          + Agregar detalle
        </button>

        {errors.general && <p className="error-general">{errors.general}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <button type="submit" className="crear-producto-btn">
          Crear producto
        </button>
      </form>
    </div>
  );
}
