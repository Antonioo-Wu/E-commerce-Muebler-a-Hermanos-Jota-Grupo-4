import "./ProductCard.css";

export default function ProductCard({ product, onClick }) {
  return (
    <article className="product-card" onClick={onClick}>
      <figure className="product-image-container">
        <img src={product.imagen} alt={product.nombre} />
      </figure>
      <div className="product-info">
        <h2 className="product-name">{product.nombre}</h2>
        <p className="product-description">{product.descripcion}</p>

        <p className="product-price">
          ${product.precio.toLocaleString("es-AR")}
        </p>

        <a
          className="detalle-button"
          href={`#product-${product.id}`}
          onClick={(e) => {
            e.preventDefault();
            if (onClick) onClick();
          }}
        >
          Ver Detalle
        </a>
      </div>
    </article>
  );
}
