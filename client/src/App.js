import { useState, useEffect } from "react";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { fetchProducts } from "./services/api";
import "./App.css";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  // Cargar productos desde el backend
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        if (!data || data.length === 0) {
          setError("No se encontraron productos.");
          setProducts([]);
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Manejar clic en producto para ver detalle
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Volver al catálogo
  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  const handleAddToCard = (producto) => {
    setCart((prev) => [...prev,producto]);
    console.log("cart size =>", cart.length + 1);
  };

  return (
    <div className="App">
      <NavBar cartCount={cart.length} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          {selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              onBack={handleBackToList}
              onAddToCart={handleAddToCard}
            />
          ) : (
            <ProductList
              products={products}
              onProductClick={handleProductClick}
            />
          )}
        </>
      )}

      <Footer /> 
    </div>
  );
}
