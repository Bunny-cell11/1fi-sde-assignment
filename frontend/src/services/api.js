const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await response.json();

  return result.data;
}

export async function getProductBySlug(slug) {
  const response = await fetch(
    `${API_URL}/api/products/${slug}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Product not found");
    }

    throw new Error("Failed to fetch product");
  }

  const result = await response.json();

  return result.data;
}
