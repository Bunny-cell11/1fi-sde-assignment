import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProductBySlug } from "../services/api";

import Loading from "../components/Loading";
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
        setLoading(true);
        setError("");

        const data = await getProductBySlug(slug);

        setProduct(data);

        if (data.variants.length > 0) {
          const firstVariant = data.variants[0];

          setSelectedVariant(firstVariant);

          if (firstVariant.emiPlans.length > 0) {
            setSelectedPlan(
              firstVariant.emiPlans[0]
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
    return <Loading text="Loading product..." />;
  }

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-2xl font-bold text-red-800">
            Product unavailable
          </h1>

          <p className="mt-2 text-red-600">
            {error}
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white"
          >
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  if (!product || !selectedVariant) {
    return null;
  }

  const mrp = Number(selectedVariant.mrp);
  const price = Number(selectedVariant.price);

  const discount = Math.round(
    ((mrp - price) / mrp) * 100
  );

  const cashback = selectedPlan
    ? Number(selectedPlan.cashback)
    : 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <Link
        to="/"
        className="mb-8 inline-flex text-sm font-medium text-gray-500 hover:text-black"
      >
        ← Back to products
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        {/* Product Image */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative flex min-h-[450px] items-center justify-center rounded-3xl border bg-white p-8 shadow-sm sm:min-h-[600px]">
            <span className="absolute left-5 top-5 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white">
              {discount}% OFF
            </span>

            <img
              src={selectedVariant.imageUrl}
              alt={`${product.name} ${selectedVariant.color}`}
              className="max-h-[520px] w-full object-contain"
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl border bg-white p-4 text-center">
              <p className="text-xs text-gray-500">
                Variants
              </p>

              <p className="mt-1 font-semibold">
                {product.variants.length}
              </p>
            </div>

            <div className="rounded-xl border bg-white p-4 text-center">
              <p className="text-xs text-gray-500">
                EMI Plans
              </p>

              <p className="mt-1 font-semibold">
                {selectedVariant.emiPlans.length}
              </p>
            </div>

            <div className="rounded-xl border bg-white p-4 text-center">
              <p className="text-xs text-gray-500">
                Cashback
              </p>

              <p className="mt-1 font-semibold">
                Available
              </p>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            {product.brand}
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-7 rounded-2xl bg-gray-50 p-5">
            <div className="flex flex-wrap items-end gap-3">
              <span className="text-4xl font-bold">
                ₹{price.toLocaleString("en-IN")}
              </span>

              <span className="text-lg text-gray-400 line-through">
                ₹{mrp.toLocaleString("en-IN")}
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Save {discount}%
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Selected variant: {selectedVariant.color} •{" "}
              {selectedVariant.storage}
            </p>
          </div>

          {/* Variants */}
          <div className="mt-8">
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelect={handleVariantChange}
            />
          </div>

          {/* EMI */}
          <div className="mt-8">
            <EmiPlanList
              plans={selectedVariant.emiPlans}
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
            />
          </div>

          {/* Summary */}
          {selectedPlan && (
            <div className="mt-8 rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  EMI Summary
                </h3>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                  Selected
                </span>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Product price
                  </span>

                  <span className="font-medium">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Monthly EMI
                  </span>

                  <span className="font-semibold">
                    ₹
                    {Number(
                      selectedPlan.monthlyAmount
                    ).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Tenure
                  </span>

                  <span className="font-medium">
                    {selectedPlan.tenure} months
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Interest
                  </span>

                  <span className="font-medium">
                    {Number(
                      selectedPlan.interestRate
                    )}
                    %
                  </span>
                </div>

                {cashback > 0 && (
                  <div className="flex justify-between border-t pt-3">
                    <span className="font-medium text-green-600">
                      Cashback
                    </span>

                    <span className="font-semibold text-green-600">
                      ₹{cashback.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Proceed */}
          <div className="mt-8">
            <ProceedButton
              disabled={!selectedPlan}
              onClick={handleProceed}
            />
          </div>

          <p className="mt-3 text-center text-xs text-gray-400">
            EMI details are provided for demonstration
            purposes.
          </p>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;