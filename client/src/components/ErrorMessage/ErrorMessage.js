import React from "react";
import "./ErrorMessage.css";

export default function ErrorMessage({ message }) {
  return (
    <div className="error-root" role="alert">
      <div className="error-box">
        <strong>Ocurrió un error:</strong>
        <div className="error-text">
          {message || "No se pudo cargar el catálogo."}
        </div>
      </div>
    </div>
  );
}
