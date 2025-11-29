import { useEffect, useState } from "react";
import { getOrders } from "../../services/api";
import "./MisPedidos.css";

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getOrders(token);
        setPedidos(data);
      } catch (error) {
        console.error("Error fetching pedidos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchPedidos();
  }, []);

  if (cargando) return <p className="pedidos-cargando">Cargando pedidos...</p>;
  if (!pedidos.length)
    return <p className="pedidos-vacio">No tenés pedidos aún</p>;

  return (
    <div className="pedidos-container">
      <h2 className="pedidos-titulo">Mis Pedidos</h2>
      {pedidos.map((pedido) => (
        <div key={pedido._id} className="pedido-card">
          <div className="pedido-header">
            <p className="pedido-id">
              <strong>ID:</strong> {pedido._id}
            </p>
            <p className="pedido-fecha">
              <strong>Fecha:</strong>{" "}
              {new Date(pedido.createdAt).toLocaleDateString()}
            </p>
            <p className="pedido-total">
              <strong>Total:</strong> ${pedido.total.toLocaleString("es-AR")}
            </p>
          </div>

          <ul className="pedido-items">
            {pedido.items.map((item) => (
              <li key={item.producto || item.productId} className="pedido-item">
                <div className="pedido-item-img-wrapper">
                  <img
                    className="pedido-item-img"
                    src={item.imagen}
                    alt={item.nombre}
                  />
                </div>

                <div className="pedido-item-info">
                  <p className="pedido-item-nombre">{item.nombre}</p>

                  <p className="pedido-item-cantidad">
                    Cantidad: {item.cantidad}
                  </p>

                  <p className="pedido-item-precio-unitario">
                    Precio unitario: ${item.precio.toLocaleString("es-AR")}
                  </p>

                  <p className="pedido-item-total">
                    Total: $
                    {(item.precio * item.cantidad).toLocaleString("es-AR")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MisPedidos;
