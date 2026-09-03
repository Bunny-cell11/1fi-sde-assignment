import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const firstVariant = product.variants[0];

  const mrp = Number(firstVariant.mrp);
  const price = Number(firstVariant.price);

  const discount = Math.round(
    ((mrp - price) / mrp) * 100
  );

  const lowestEmi = Math.min(
    ...product.variants.flatMap((variant) =>
      variant.emiPlans.map((plan) =>
        Number(plan.monthlyAmount)
      )
    )
  );

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative flex h-72 items-center justify-center bg-gray-50 p-8">
        <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
          {discount}% OFF
        </span>

        <img
          src={firstVariant.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {product.brand}
        </p>

        <h2 className="mt-1 text-xl font-semibold text-gray-950">
          {product.name}
        </h2>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold">
            ₹{price.toLocaleString("en-IN")}
          </span>

          <span className="text-sm text-gray-400 line-through">
            ₹{mrp.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="mt-4 rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">
            Starting EMI
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            ₹{lowestEmi.toLocaleString("en-IN")}/month
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-green-600">
            EMI available
          </span>

          <span className="text-sm font-semibold text-gray-900 transition group-hover:translate-x-1">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
