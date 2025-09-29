import productos from "./data";

const API_URL = process.env.REACT_APP_API_URL;

export async function fetchProducts() {
  // const res = await fetch(`${API_URL}/api/productos`);
  // if (!res.ok) {
  //   const text = await res.text().catch(() => "");
  //   throw new Error(text || `HTTP ${res.status}`);
  // }
  // return res.json();

  await new Promise((resolve) => setTimeout(resolve, 600)); // simulacion de api
  return productos;
}
