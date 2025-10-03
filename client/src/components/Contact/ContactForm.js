import React, { useState } from "react";
import "./Contact.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (eventoSubmit) => {
    eventoSubmit.preventDefault();
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!formData.nombre.trim()) {
      newErrors.nombre = "Por favor, ingresá tu nombre.";
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresá un email válido (ej: nombre@dominio.com).";
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "Escribí tu mensaje.";
    } else if (formData.mensaje.length < 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    }

    setErrors(newErrors);

    if (!Object.keys(newErrors).length) {
      console.log("Datos enviados:", formData);
      setSuccess(true);
      setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="contacto-derecha">
      {success && <div className="success-banner">¡Gracias! Tu mensaje fue enviado correctamente.</div>}
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
        />
        {errors.nombre ? <span className="error-msg">{errors.nombre}</span> : null}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
        />
        {errors.email ? <span className="error-msg">{errors.email}</span> : null}


        <label>Asunto</label>
        <input
          type="text"
          name="asunto"
          value={formData.asunto}
          onChange={handleChange}
          placeholder="Motivo de tu mensaje"
        />

        <label>Mensaje</label>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Escribí tu consulta..."
        />
        {errors.mensaje ? <span className="error-msg">{errors.mensaje}</span> : null}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContactForm;
