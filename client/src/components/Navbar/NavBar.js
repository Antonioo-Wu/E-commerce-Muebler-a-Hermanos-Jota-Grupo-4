import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({
  cartCount = 0,
  logo = "/logo.svg",
  onCartClick,
}) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeIfMobile = () => {
    if (window.innerWidth < 1024) setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={closeIfMobile}>
          <img className="brand-logo" src={logo} alt="Hermanos Jota" />
          <span className="brand-name">
            <strong>Hermanos Jota</strong>
          </span>
        </Link>

        <nav
          className={`main-nav ${open ? "active" : ""}`}
          aria-label="Navegación principal"
        >
          <ul onClick={closeIfMobile}>
            <li>
              <Link
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/productos"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                to="/admin/crear-producto"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Admin
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className="cart-button"
          aria-label="Carrito"
          onClick={onCartClick}
          type="button"
        >
          <span className="cart-icon" aria-hidden="true">
            🛒
          </span>
          <span id="cart-count" className="cart-count">
            {cartCount}
          </span>
        </button>

        <button
          className={`menu-toggle ${open ? "active" : ""}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={toggleMenu}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
