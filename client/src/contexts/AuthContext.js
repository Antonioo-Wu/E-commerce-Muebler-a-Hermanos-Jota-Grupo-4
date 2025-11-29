import { createContext, useContext, useState } from "react";
import { fetchUserProfile } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMsg = data.msg || "Error en el Login";
        throw new Error(errorMsg);
      }
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      await fetchProfile();
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMsg = data.msg || "Error en el registro";
        throw new Error(errorMsg);
      }
      return { success: true, message: data.msg || "Registro exitoso. Inicie sesión." };
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const fetchProfile = async () => {
    try {
      const data = await fetchUserProfile();
      setUser(data.user);
    } catch (error) {
      console.error("Error obteniendo el perfil del usuario:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
        register,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
