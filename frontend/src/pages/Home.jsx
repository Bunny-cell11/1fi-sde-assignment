import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { getProducts } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <main>
      <section className="border-b bg-gray-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
              Flexible payments
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your favorite smartphones.
              <span className="block text-gray-400">
                Easy monthly EMIs.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
              Choose a smartphone, select your preferred
              variant and EMI plan, and get started.
            </p>

            <a
              href="#products"
              className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-gray-950 transition hover:bg-gray-200"
            >
              Explore products
            </a>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16"
      >
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Our collection
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-950">
              Featured smartphones
            </h2>
          </div>

          <p className="hidden text-sm text-gray-500 sm:block">
            {products.length} products
          </p>
        </div>

        {loading && <Loading text="Loading products..." />}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            <p className="font-semibold">
              Something went wrong
            </p>

            <p className="mt-1 text-sm">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
