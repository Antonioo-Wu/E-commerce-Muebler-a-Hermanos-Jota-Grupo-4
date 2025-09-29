import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

export default function ProductList({ products, onProductClick }) {
  return (
    <section className="catalogo-page">
      <h1 className="page-title">Nuestro Catálogo</h1>
      <div id="product-grid" className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>
    </section>
  );
}
