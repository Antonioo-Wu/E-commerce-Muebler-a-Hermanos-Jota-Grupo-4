import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import "./CartView.css";

const CartView = ({ onClose }) => {
  const { items, removeItem, clearCart, checkout, getTotal } = useCart();

  const [msg, setMsg] = useState(null);

  const handleCheckout = async () => {
    const result = await checkout();
    setMsg(result);

    setTimeout(() => {
      setMsg(null);
    }, 3000);
  };

  return (
    <div className="cart-dropdown">
      <div className="cart-header">
        <h2 className="cart-title">
          <AiOutlineShoppingCart /> Carrito
        </h2>

        {onClose && (
          <button className="cart-close-btn" onClick={onClose}>
            <AiOutlineClose />
          </button>
        )}
      </div>

      {msg ? (
        <div className="cart-msg">{msg}</div>
      ) : items.length === 0 ? (
        <p className="cart-vacio">Tu carrito está vacío 🛒</p>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <div key={item._id} className="cart-card">
                <div className="cart-card-img-wrap">
                  <img
                    src={item.imagen || "/placeholder.png"}
                    alt={item.nombre}
                    className="cart-card-img"
                  />
                </div>

                <div className="cart-card-info">
                  <div className="cart-card-name">{item.nombre}</div>
                  <div className="cart-card-qty">Cantidad: {item.quantity}</div>
                  <div className="cart-card-precio">
                    Precio: ${item.precio.toLocaleString("es-AR")}
                  </div>
                  <div className="cart-card-total">
                    Subtotal: $
                    {(item.precio * item.quantity).toLocaleString("es-AR")}
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="cart-eliminar-btn"
                >
                  <AiOutlineDelete size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total-row">
            <span className="cart-total-label">Total</span>
            <span className="cart-total-value">
              ${getTotal().toLocaleString("es-AR")}
            </span>
          </div>

          <div className="cart-actions">
            <button onClick={handleCheckout} className="cart-checkout-btn">
              Finalizar Compra
            </button>

            <button onClick={clearCart} className="cart-vaciar-btn">
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartView;
