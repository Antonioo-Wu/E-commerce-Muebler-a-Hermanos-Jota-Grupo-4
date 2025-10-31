import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({
  product,
  showDescription = true,
  rutaDetalle = null,
}) {
  return (
    <article className="product-card">
      <figure className="product-image-container">
        <img src={product.imagen} alt={product.nombre} />
      </figure>
      <div className="product-info">
        <h2 className="product-name">{product.nombre}</h2>
        {showDescription && (
          <p className="product-description">{product.descripcion}</p>
        )}
        <div className="product-footer">
          <p className="product-price">
            ${product.precio.toLocaleString("es-AR")}
          </p>

          <Link
            className="detalle-button"
            to={rutaDetalle ? rutaDetalle : `${product.id}`}
          >
            Ver Detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
