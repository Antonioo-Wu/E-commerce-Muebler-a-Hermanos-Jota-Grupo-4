import { useAuth } from "../../contexts/AuthContext";
import "./Perfil.css";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="perfil-wrapper">

      <div className="perfil-card">

        {/* Icono */}
        <div className="perfil-icon">
          <img src="/user-icon.png" alt="user" />
        </div>

        {/* Datos principales */}
        <div className="perfil-main-info">
          <h2>{user.nombre}</h2>
          <p className="perfil-email">{user.email}</p>
        </div>

        {/* Datos inferiores */}
        <div className="perfil-details">
          <h3>Información Personal</h3>
          <p><strong>Rol:</strong> {user.role}</p>
        </div>
      </div>

      <div className="perfil-logout-container">
        <button className="perfil-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
};

export default Perfil;
