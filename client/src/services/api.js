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

export async function updateProduct(id, formDataToSend) {
  try {
    const res = await fetch(`${API_URL}/api/productos/${id}`, {
      method: "PUT",
      body: formDataToSend,
    });
    if (!res.ok) {
      throw new Error(`Error al actualizar el producto (status ${res.status})`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error actualizando producto ${id}:`, error);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error(`Error en login (status ${res.status})`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

export async function registerUser(name, email, password) {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      throw new Error(`Error en registro (status ${res.status})`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
}

export async function fetchUserProfile() {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/auth/perfil`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Error al obtener el perfil: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    throw error;
  }
}
