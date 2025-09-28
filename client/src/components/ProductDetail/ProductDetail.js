import "./ProductDetail.css";

export default function ProductDetail({ product, onBack }) {
  if (!product)
    return (
      <div className="product-detail-container">
        <p>Producto no encontrado.</p>
      </div>
    );

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.imagen} alt={product.nombre} />
      </div>

      <div className="product-detail-info">
        <button
          className="back-button"
          onClick={() => {
            if (onBack) onBack();
            else window.history.back();
          }}
          aria-label="Volver al catálogo"
        >
          ← Volver al catálogo
        </button>
        <h2 className="product-detail-name">{product.nombre}</h2>

        <p className="product-detail-price">
          ${product.precio.toLocaleString("es-AR")}
        </p>

        <p className="product-detail-description">{product.descripcion}</p>

        <table className="product-detail-table">
          <tbody>
            {product.detalles &&
              product.detalles.map((d, i) => (
                <tr key={i}>
                  <th>{d.label}</th>
                  <td>{d.value}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <button className="add-to-cart">🛒 Añadir al carrito</button>
      </div>
    </div>
  );
}
