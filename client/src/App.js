import { useState, useEffect } from "react";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { fetchProducts } from "./services/api";
import "./App.css";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [view,setView] = useState("home"); 


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
    setView("catalog");
  };

  // Volver al catálogo
  const handleBackToList = () => {
    setSelectedProduct(null);
    setView("catalog");
  };

  const handleAddToCart = (producto) => {
    setCart((prev) => [...prev,producto]);
    console.log("cart size =>", cart.length + 1);
  };

  const goHome = () => {setSelectedProduct(null); setView("home");};
  const goToCatalog = () => {setSelectedProduct(null); setView("catalog");}

  return (
    <div className="App">
      <NavBar 
        cartCount={cart.length} 
        currentView={view}
        onGoHome={goHome}
        onGoCatalog={goToCatalog}
      />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          {view === "home" ? (
            <Home
              products={products}
              onVerCatalogo={goToCatalog}
              onVerDetalle={handleProductClick}
            />
          ): selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              onBack={handleBackToList}
              onAddToCart={handleAddToCart}
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
