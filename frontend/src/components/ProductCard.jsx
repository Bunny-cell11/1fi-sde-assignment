import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const firstVariant = product.variants[0];

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-64 items-center justify-center bg-gray-50 p-6">
        <img
          src={firstVariant.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain transition group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500">
          {product.brand}
        </p>

        <h2 className="mt-1 text-xl font-semibold text-gray-900">
          {product.name}
        </h2>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xl font-bold">
            ₹{Number(firstVariant.price).toLocaleString("en-IN")}
          </span>

          <span className="text-sm text-gray-400 line-through">
            ₹{Number(firstVariant.mrp).toLocaleString("en-IN")}
          </span>
        </div>

        <p className="mt-2 text-sm text-green-600">
          EMI available
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
