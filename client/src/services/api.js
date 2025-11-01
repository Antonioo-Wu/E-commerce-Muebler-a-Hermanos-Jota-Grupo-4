const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export { API_URL };

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/api/productos`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_URL}/api/productos/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

export async function deleteProductById(id) {
  try {
    const res = await fetch(`${API_URL}/api/productos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Error al eliminar el producto (status ${res.status})`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error eliminando producto ${id}:`, error);
    throw error;
  }
}

export async function createProduct(formDataToSend) {
  try {
    const res = await fetch(`${API_URL}/api/productos`, {
      method: "POST",
      body: formDataToSend,
    });
    if (!res.ok) {
      throw new Error(`Error al crear el producto (status ${res.status})`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error creando producto:", error);
    throw error;
  }
}