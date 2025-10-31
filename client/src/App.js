import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import Productos from "./pages/Productos";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import Home from "./pages/Home/Home";
import ProductDetail from "./components/ProductDetail/ProductDetail";

export default function App() {
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
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
