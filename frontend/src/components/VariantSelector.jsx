function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
}) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">
        Choose Variant
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        {variants.map((variant) => {
          const selected =
            selectedVariant.id === variant.id;

          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelect(variant)}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-black bg-gray-100"
                  : "border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              <p className="font-medium">
                {variant.color}
              </p>

              <p className="text-sm text-gray-500">
                {variant.storage}
              </p>

              <p className="mt-2 font-semibold">
                ₹
                {Number(variant.price).toLocaleString(
                  "en-IN"
                )}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VariantSelector;
