import { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import ProductList from "../components/ProductList/ProductList";

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <section>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <ProductList products={products} />}
    </section>
  );
}
