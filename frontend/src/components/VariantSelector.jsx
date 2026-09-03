function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Choose Variant
        </h3>

        {selectedVariant && (
          <span className="text-sm text-gray-500">
            {selectedVariant.color} •{" "}
            {selectedVariant.storage}
          </span>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {variants.map((variant) => {
          const selected =
            selectedVariant?.id === variant.id;

          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelect(variant)}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-black bg-gray-950 text-white shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  {variant.color}
                </p>

                {selected && (
                  <span className="text-sm">
                    ✓
                  </span>
                )}
              </div>

              <p
                className={`mt-1 text-sm ${
                  selected
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}
              >
                {variant.storage}
              </p>

              <p className="mt-3 font-semibold">
                ₹
                {Number(
                  variant.price
                ).toLocaleString("en-IN")}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VariantSelector;