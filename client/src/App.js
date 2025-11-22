import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import Productos from "./pages/Productos";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import Home from "./pages/Home/Home";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Perfil from "./pages/Perfil/Perfil";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);

  const handleAddToCart = (producto) => {
    setCart((prev) => [...prev, producto]);
  };

  return (
    <div className="App">
      <NavBar cartCount={cart.length} />

      <main>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route
            path="/productos/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/admin/crear-producto" element={<CreateProduct />} />
          <Route path="/admin/editar-producto/:id" element={<EditProduct />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/registro"
            element={isAuthenticated ? <Navigate to="/" /> : <Registro />}
          />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
