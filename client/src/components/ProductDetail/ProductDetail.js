import "./ProductDetail.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, deleteProductById } from "../../services/api";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "../Modal/Modal";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [modal, setModal] = useState({ show: false, title: '', message: '', onConfirm: null });

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

  const handleDelete = () => {
    setModal({
      show: true,
      title: 'Confirmar eliminación',
      message: '¿Seguro que querés eliminar este producto?',
      onConfirm: confirmDelete
    });
  };

  const confirmDelete = async () => {
    setModal({ show: false });
    try {
      await deleteProductById(id);
      setModal({
        show: true,
        title: 'Éxito',
        message: 'Producto eliminado correctamente',
        onConfirm: null
      });
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      setModal({
        show: true,
        title: 'Error',
        message: 'No se pudo eliminar el producto',
        onConfirm: null
      });
    }
  };

  const closeModal = () => {
    setModal({ show: false, title: '', message: '', onConfirm: null });
    if (modal.title === 'Éxito') {
      navigate("/productos");
    }
  };

  const isAdmin = user && user.role === 'admin';

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

        {product.detalles && product.detalles.length > 1 && (
          <table className="product-detail-table">
            <tbody>
              {product.detalles.map((d, i) => (
                <tr key={i}>
                  <th>{d.label}</th>
                  <td>{d.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <AddToCartButton product={product} />
        {isAdmin && (
          <>
            <button
              className="add-to-cart"
              onClick={() => navigate(`/admin/editar-producto/${id}`)}
            >
              ✏️ Editar producto
            </button>
            <button className="add-to-cart" onClick={handleDelete}>
              🗑️ Eliminar producto
            </button>
          </>
        )}
      </div>
      <Modal
        show={modal.show}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
}
