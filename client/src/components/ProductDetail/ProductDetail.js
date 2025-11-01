import "./ProductDetail.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductById,
  deleteProductById,
  API_URL,
} from "../../services/api";

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading)
    return (
      <div className="product-detail-container">
        <p>Cargando producto...</p>
      </div>
    );

  if (error)
    return (
      <div className="product-detail-container">
        <p>{error}</p>
      </div>
    );

  if (!product)
    return (
      <div className="product-detail-container">
        <p>Producto no encontrado.</p>
      </div>
    );

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "¿Seguro que querés eliminar este producto?"
    );
    if (!confirmed) return;

    try {
      await deleteProductById(id);
      alert("Producto eliminado correctamente");
      navigate("/productos");
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={`${API_URL}${product.imagen}`} alt={product.nombre} />
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
        <button className="add-to-cart" onClick={handleDelete}>
          🗑️ Eliminar producto
        </button>
      </div>
    </div>
  );
}
