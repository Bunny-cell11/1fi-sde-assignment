function EmiPlanCard({
  plan,
  selected,
  onSelect,
}) {
  const monthly = Number(plan.monthlyAmount);
  const cashback = Number(plan.cashback);
  const interest = Number(plan.interestRate);

  return (
    <button
      type="button"
      onClick={() => onSelect(plan)}
      className={`w-full rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-black bg-gray-950 text-white shadow-lg"
          : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-xs font-medium uppercase tracking-wide ${
              selected
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Monthly EMI
          </p>

          <p className="mt-1 text-2xl font-bold">
            ₹{monthly.toLocaleString("en-IN")}
            <span
              className={`ml-1 text-sm font-normal ${
                selected
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              /month
            </span>
          </p>
        </div>

        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full border ${
            selected
              ? "border-white bg-white text-black"
              : "border-gray-300"
          }`}
        >
          {selected && "✓"}
        </div>
      </div>

      <div
        className={`mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-sm ${
          selected
            ? "border-gray-700"
            : "border-gray-100"
        }`}
      >
        <div>
          <p
            className={
              selected
                ? "text-gray-400"
                : "text-gray-500"
            }
          >
            Tenure
          </p>

          <p className="mt-1 font-semibold">
            {plan.tenure} months
          </p>
        </div>

        <div>
          <p
            className={
              selected
                ? "text-gray-400"
                : "text-gray-500"
            }
          >
            Interest
          </p>

          <p className="mt-1 font-semibold">
            {interest}%
          </p>
        </div>
      </div>

      {cashback > 0 && (
        <div
          className={`mt-4 rounded-lg px-3 py-2 text-sm font-medium ${
            selected
              ? "bg-gray-800 text-green-400"
              : "bg-green-50 text-green-700"
          }`}
        >
          ₹{cashback.toLocaleString("en-IN")} cashback
        </div>
      )}
    </button>
  );
}

export default EmiPlanCard;