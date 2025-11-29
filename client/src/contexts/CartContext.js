import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { postOrder } from "../services/api";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const exist = prev.find((item) => item._id === product._id);
      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  const getTotal = () =>
    items.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  const getItemCount = () =>
    items.reduce((acc, item) => acc + item.quantity, 0);

  const checkout = async () => {
    if (!isAuthenticated) {
      return "Debes iniciar sesión para finalizar la compra";
    }

    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item._id,
          cantidad: item.quantity,
        })),
        total: getTotal(),
      };

      await postOrder(orderData, token);
      clearCart();

      return "Compra realizada con éxito";
    } catch (error) {
      console.error("Error en checkout:", error);
      return "Ocurrió un error al finalizar la compra";
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        checkout,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
