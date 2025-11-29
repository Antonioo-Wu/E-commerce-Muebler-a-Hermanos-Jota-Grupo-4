import { Link } from "react-router-dom";
import "./ProductCard.css";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

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

          <div className="product-card-buttons">
            <Link
              className="detalle-button"
              to={rutaDetalle ? rutaDetalle : `${product.id}`}
            >
              Ver Detalle
            </Link>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
