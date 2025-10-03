import React from "react";
import ContactForm from "./ContactForm";
import "./Contact.css";

const Contact = () => {
  return (
    <main>
      <h2 className="titulo-contacto">Contactános</h2>
      <div className="container">
        <div className="contacto-contenedor">
          {/* Lado izquierdo */}
          <div
            className="contacto-izquierda"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/contacto/background.png)`,
            }}
          >
            <div className="overlay"></div>
            <div className="logo-centro">
              <img
                src={`${process.env.PUBLIC_URL}/contacto/logo-blanco.png`}
                alt="Hermanos Jota Logo"
              />
            </div>
            <section className="texto-overlay">
              <p>
                <strong>
                  ¿Buscás un mueble único o querés más detalles de nuestros productos?
                </strong>
              </p>
              <p>
                <strong>
                  Completá el formulario y nuestro equipo se pondrá en contacto con vos lo antes posible.
                </strong>
              </p>
            </section>
          </div>

          {/* Lado derecho */}
          <ContactForm />
        </div>
      </div>
    </main>
  );
};

export default Contact;
