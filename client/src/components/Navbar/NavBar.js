import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import CartView from "../CartView/CartView";
import "./NavBar.css";

export default function NavBar({ logo = "/logo.svg" }) {
  const [open, setOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { items, getItemCount } = useCart();

  const toggleMenu = () => setOpen(!open);
  const closeIfMobile = () => {
    if (window.innerWidth < 1024) setOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeIfMobile();
    navigate("/login");
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
                id="admin-link"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Admin
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/perfil"
                    id="perfil-link"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mis-pedidos"
                    id="pedidos-link"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Pedidos
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    id="login-link"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/registro"
                    id="registro-link"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Registro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="cart-wrapper relative">
          <button
            className="cart-button"
            aria-label="Carrito"
            onClick={() => setShowCart((prev) => !prev)}
            type="button"
          >
            <span className="cart-icon" aria-hidden="true">
              🛒
            </span>
            <span id="cart-count" className="cart-count">
              {getItemCount()}
            </span>
          </button>

          {showCart && (
            <div className="cart-dropdown">
              <CartView onClose={() => setShowCart(false)} />
            </div>
          )}
        </div>

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
