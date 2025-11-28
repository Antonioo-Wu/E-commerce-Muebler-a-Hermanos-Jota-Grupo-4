import { useAuth } from "../../contexts/AuthContext";
import "./Perfil.css";

const Perfil = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="perfil-wrapper">
      
      <div className="perfil-header">
        <h2>{user.nombre}</h2>
        <p>{user.email}</p>
      </div>

      <div className="section personal-info">
        <h3>Información Personal</h3>

        <p><strong>Rol:</strong> {user.role}</p>
      </div>

    </div>
  );
};

export default Perfil;
