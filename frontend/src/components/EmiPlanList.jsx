import EmiPlanCard from "./EmiPlanCard";

function EmiPlanList({
  plans,
  selectedPlan,
  onSelect,
}) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">
        Choose EMI Plan
      </h3>

      <div className="space-y-3">
        {plans.map((plan) => (
          <EmiPlanCard
            key={plan.id}
            plan={plan}
            selected={selectedPlan?.id === plan.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default EmiPlanList;
