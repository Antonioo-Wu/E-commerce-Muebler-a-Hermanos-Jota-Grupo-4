import { useEffect, useState } from "react";
import "./MisPedidos.css";

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simulación de datos con imágenes
    setTimeout(() => {
      setPedidos([
        {
          _id: "abc123",
          createdAt: "2025-11-27T15:30:00Z",
          total: 700000,
          estado: "Enviado",
          items: [
            {
              productId: 1,
              nombre: "Aparador Uspallata",
              quantity: 1,
              precio: 480000,
              imagen: "/productos/aparador_uspallata.png",
            },
            {
              productId: 3,
              nombre: "Butaca Mendoza",
              quantity: 1,
              precio: 220000,
              imagen: "/productos/butaca_mendoza.png",
            },
          ],
        },
        {
          _id: "def456",
          createdAt: "2025-11-20T12:00:00Z",
          total: 390000,
          estado: "Pendiente",
          items: [
            {
              productId: 2,
              nombre: "Biblioteca Recoleta",
              quantity: 1,
              precio: 390000,
              imagen: "/productos/biblioteca_recoleta.png",
            },
          ],
        },
      ]);
      setCargando(false);
    }, 1000);

    /*
  const fetchPedidos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Error obteniendo pedidos: ${res.status}`);
      const data = await res.json();
      setPedidos(data); 
    } catch (error) {
      console.error("Error fetching pedidos:", error);
    } finally {
      setCargando(false);
    }
  };

  fetchPedidos();
  */
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
              <strong>Total:</strong> ${pedido.total}
            </p>

            <p
              className={`pedido-estado pedido-estado--${pedido.estado.toLowerCase()}`}
            >
              {pedido.estado}
            </p>
          </div>

          <ul className="pedido-items">
            {pedido.items.map((item) => (
              <li key={item.productId} className="pedido-item">
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
                    Cantidad: {item.quantity}
                  </p>
                </div>

                <p className="pedido-item-precio">${item.precio}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MisPedidos;
