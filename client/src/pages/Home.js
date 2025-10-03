
import './Home.css'
import ProductCard from "../components/ProductCard/ProductCard";

export default function Home({ products =[], onVerCatalogo, onVerDetalle }) {
    const destacados = (products || [])
    .filter((p) => p?.destacado === true)
    .slice(0,5);
    const heroImage = "/heroBanner.jpg";
    
    return(
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
                    <button className="btn-primary" type="button" onClick={onVerCatalogo}>
                    Ver productos
                    </button>
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
                            onClick={() => onVerDetalle?.(p)} showDescription={false}
                            />
                    ))}
                    </div>
                ) : (
                    <p>No hay productos destacados por el momento.</p>
                )}

                <div className="destacados-cta">
                    <button className="btn-primary" type="button" onClick={onVerCatalogo}>
                    Ver todos los productos
                    </button>
                </div>
                </div>
            </section>

        </main>
    );
}