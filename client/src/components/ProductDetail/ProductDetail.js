import "./ProductDetail.css";

export default function ProductDetail({ onAddToCart }) {
  // datos de prueba hasta que se implemente lo del llamado a la api
  const product = {
    id: 1,
    nombre: "Sofá Roma 3 cuerpos",
    imagen: "https://via.placeholder.com/600x400?text=Sof%C3%A1+Roma",
    precio: 45999,
    descripcion:
      "Sofá tapizado en tela resistente, 3 cuerpos, estructura de madera maciza.",
    detalles: [
      { label: "Material", value: "Tela poliéster" },
      { label: "Color", value: "Gris claro" },
      { label: "Ancho", value: "220 cm" },
      { label: "Profundidad", value: "90 cm" },
      { label: "Altura", value: "85 cm" },
      { label: "Peso", value: "45 kg" },
      { label: "Garantía", value: "12 meses" },
    ],
    stock: 5,
  };
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

        <button className="add-to-cart" onClick={() => onAddToCart(product)}>
          🛒 Añadir al carrito
        </button>
      </div>
    </div>
  );
}
