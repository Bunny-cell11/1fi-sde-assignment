function EmiPlanCard({
  plan,
  selected,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan)}
      className={`w-full rounded-xl border p-4 text-left transition ${
        selected
          ? "border-black bg-gray-100"
          : "border-gray-200 bg-white hover:border-gray-400"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">
            ₹
            {Number(
              plan.monthlyAmount
            ).toLocaleString("en-IN")}
            /month
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {plan.tenure} months
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm">
            Interest: {Number(plan.interestRate)}%
          </p>

          {Number(plan.cashback) > 0 && (
            <p className="mt-1 text-sm font-medium text-green-600">
              ₹
              {Number(
                plan.cashback
              ).toLocaleString("en-IN")}{" "}
              cashback
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default EmiPlanCard;
