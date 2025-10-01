import  { useState } from "react";
import "./NavBar.css"

export default function NavBar({ cartCount = 0, logo= "/logo.svg", onCartClick }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeIfMobile = () => {
    if (window.innerWidth < 1024) setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="brand" onClick={closeIfMobile}>
          <img className="brand-logo" src={logo} alt="Hermanos Jota" />
          <span className="brand-name"><strong>Hermanos Jota</strong></span>
        </a>

        <nav className={`main-nav ${open ? "active" : ""}`} aria-label="Navegación principal">
          <ul onClick={closeIfMobile}>
            <li><a className="active" href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </nav>

        <button className="cart-button" aria-label="Carrito" onClick={onCartClick} type="button">
          <span className="cart-icon" aria-hidden="true">🛒</span>
          <span id="cart-count" className="cart-count">{cartCount}</span>
        </button>

        <button
          className={`menu-toggle ${open ? "active" : ""}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={toggleMenu}
          type="button"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
