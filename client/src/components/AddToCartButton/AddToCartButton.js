import { useCart } from "../../contexts/CartContext";
import "./AddToCartButton.css";

function AddToCartButton({ product, quantity = 1, className = "" }) {
  const { addItem } = useCart();

  return (
    <button
      className={`add-to-cart ${className}`}
      onClick={() => addItem(product, quantity)}
    >
      🛒 Añadir al carrito
    </button>
  );
}

export default AddToCartButton;
