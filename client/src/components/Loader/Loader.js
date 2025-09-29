import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-root" role="status" aria-live="polite">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loader-text">Cargando catálogo...</div>
    </div>
  );
}
