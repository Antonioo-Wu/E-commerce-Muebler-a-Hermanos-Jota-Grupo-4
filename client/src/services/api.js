const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

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