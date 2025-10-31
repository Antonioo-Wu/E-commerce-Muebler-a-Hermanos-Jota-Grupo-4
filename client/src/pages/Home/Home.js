import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        if (!data || data.length === 0) {
          setProducts([]);
        } else {
          setProducts(data);
        }
      } catch (err) {
        setProducts([]);
      }
    };
    load();
  }, []);

  const destacados = products.filter((p) => p?.destacado === true).slice(0, 5);
  const heroImage = "/heroBanner.jpg";

  return (
    <main className="home-page">
      {/* HERO */}
      <section
        className="hero"
        aria-label="Presentación"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>Viví la calidez del diseño atemporal</h1>
            <p>Diseñados con materiales nobles y manos expertas.</p>
            <Link className="btn-primary" to="/productos">
              Ver catalogo
            </Link>
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="destacados" aria-labelledby="destacados-title">
        <div className="container">
          <header className="section-head">
            <h2 id="destacados-title">Productos Destacados</h2>
          </header>

          {destacados.length > 0 ? (
            <div className="product-grid" data-testid="destacados-grid">
              {destacados.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  showDescription={false}
                  rutaDetalle={`productos/${p.id}`}
                />
              ))}
            </div>
          ) : (
            <p>No hay productos destacados por el momento.</p>
          )}

          <div className="destacados-cta">
            <Link className="btn-primary" to={"/productos"}>
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
