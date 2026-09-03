import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductBySlug } from "../services/api";
import VariantSelector from "../components/VariantSelector";
import EmiPlanList from "../components/EmiPlanList";
import ProceedButton from "../components/ProceedButton";

function ProductPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] =
    useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductBySlug(slug);

        setProduct(data);

        if (data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);

          if (data.variants[0].emiPlans.length > 0) {
            setSelectedPlan(
              data.variants[0].emiPlans[0]
            );
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  function handleVariantChange(variant) {
    setSelectedVariant(variant);

    setSelectedPlan(
      variant.emiPlans.length > 0
        ? variant.emiPlans[0]
        : null
    );
  }

  function handleProceed() {
    if (!selectedVariant || !selectedPlan) {
      return;
    }

    alert(
      `Proceeding with ${product.name} - ${selectedVariant.color} ${selectedVariant.storage} on ${selectedPlan.tenure}-month EMI`
    );
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-white p-8 shadow-sm">
          <img
            src={selectedVariant?.imageUrl}
            alt={product.name}
            className="max-h-[500px] w-full object-contain"
          />
        </div>

        <div>
          <p className="text-sm text-gray-500">
            {product.brand}
          </p>

          <h1 className="mt-1 text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="mt-3 text-gray-600">
            {product.description}
          </p>

          {selectedVariant && (
            <div className="mt-6">
              <span className="text-3xl font-bold">
                ₹
                {Number(
                  selectedVariant.price
                ).toLocaleString("en-IN")}
              </span>

              <span className="ml-3 text-lg text-gray-400 line-through">
                ₹
                {Number(
                  selectedVariant.mrp
                ).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          <div className="mt-8">
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelect={handleVariantChange}
            />
          </div>

          {selectedVariant && (
            <div className="mt-8">
              <EmiPlanList
                plans={selectedVariant.emiPlans}
                selectedPlan={selectedPlan}
                onSelect={setSelectedPlan}
              />
            </div>
          )}

          <div className="mt-8">
            <ProceedButton
              disabled={
                !selectedVariant || !selectedPlan
              }
              onClick={handleProceed}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
