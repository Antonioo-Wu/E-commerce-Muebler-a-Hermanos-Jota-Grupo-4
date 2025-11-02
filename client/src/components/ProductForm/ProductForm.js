import React from "react";
import "./ProductForm.css";

export default function ProductForm({
  formTitle = "",
  formData,
  handleChange,
  handleDetalleChange,
  agregarDetalle,
  eliminarDetalle,
  imagenPreview,
  errors = {},
  successMessage = "",
  onSubmit,
  submitLabel = "Submit",
}) {
  return (
    <div className="crear-producto">
      <h2>{formTitle}</h2>
      <form onSubmit={onSubmit} noValidate>
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
          Imagen:
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.imagen && <span className="error">{errors.imagen}</span>}
        </label>

        {imagenPreview && (
          <div className="imagen-preview">
            <p>Previsualización:</p>
            <img
              src={imagenPreview}
              alt="preview"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}

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
            checked={!!formData.destacado}
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
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
