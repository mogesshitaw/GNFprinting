
"use client";

import { useState } from "react";
import { Price } from "@/types/price";
import PriceCalculator from "@/components/PriceCalculator";
import ServiceDetailsModal from "@/components/ServiceDetailsModal";

interface ServicesViewProps {
  prices: Price[];
}

type ViewMode = "grid" | "list";

export default function ServicesView({
  prices,
}: ServicesViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [selectedService, setSelectedService] =
    useState<Price | null>(null);

  const [calculatorService, setCalculatorService] =
    useState<Price | null>(null);

  function openDetails(price: Price) {
    setSelectedService(price);
  }

  function closeDetails() {
    setSelectedService(null);
  }

  function openCalculator(price: Price) {
    setSelectedService(null);
    setCalculatorService(price);
  }

  function closeCalculator() {
    setCalculatorService(null);
  }

  function getPricingLabel(
    pricingType: Price["pricingType"]
  ) {
    switch (pricingType) {
      case "fixed":
        return "Fixed Price";

      case "quantity":
        return "Quantity Based";

      case "area":
        return "Area Based";

      case "volume":
        return "Volume Based";

      default:
        return pricingType;
    }
  }

  function getPriceText(price: Price) {
    if (price.pricingType === "fixed") {
      return `${price.unitPrice.toLocaleString()} ETB`;
    }

    if (price.pricingType === "area") {
      return `${price.unitPrice.toLocaleString()} ETB / m²`;
    }

    if (price.pricingType === "volume") {
      return `${price.unitPrice.toLocaleString()} ETB / m³`;
    }

    return `${price.unitPrice.toLocaleString()} ETB / ${price.unit}`;
  }

  function getServiceIcon(service: string) {
    const name = service.toLowerCase();

    if (name.includes("banner")) return "🖼️";
    if (name.includes("card")) return "💳";
    if (name.includes("acrylic")) return "✨";
    if (name.includes("logo")) return "🎨";
    if (name.includes("paper")) return "📄";
    if (name.includes("sticker")) return "🏷️";
    if (name.includes("sign")) return "🪧";
    if (name.includes("dtf")) return "👕";
    if (name.includes("photo")) return "📸";
    if (name.includes("design")) return "✏️";

    return "🖨️";
  }

  function getServiceColor(index: number) {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-violet-500 to-purple-500",
      "from-orange-500 to-pink-500",
      "from-emerald-500 to-teal-500",
      "from-cyan-500 to-blue-500",
      "from-pink-500 to-rose-500",
    ];

    return colors[index % colors.length];
  }

  return (
    <>
      {/* =====================================================
          TOOLBAR
      ====================================================== */}

      <div className="mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">

          {/* Heading */}

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl shadow-lg shadow-blue-600/20">
                🖨️
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Our Services
                </h2>

                <p className="text-sm text-slate-500">
                  Professional printing & advertising solutions
                </p>
              </div>

            </div>
          </div>


          {/* Count + View Switcher */}

          <div className="flex flex-wrap items-center gap-4">

            <div className="rounded-xl bg-slate-50 px-4 py-2.5">
              <span className="text-sm font-bold text-blue-600">
                {prices.length}
              </span>

              <span className="ml-1 text-sm text-slate-500">
                services
              </span>
            </div>


            <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span className="text-base">▦</span>
                Grid
              </button>


              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
                  viewMode === "list"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span className="text-base">☰</span>
                List
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          EMPTY STATE
      ====================================================== */}

      {prices.length === 0 && (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">

          <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-blue-100 blur-3xl" />

          <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-cyan-100 blur-3xl" />

          <div className="relative">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
              🖨️
            </div>

            <h3 className="mt-6 text-2xl font-black text-slate-900">
              No services available
            </h3>

            <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
              Our printing services will appear here when
              the administrator adds them.
            </p>

          </div>
        </div>
      )}


      {/* =====================================================
          GRID VIEW
      ====================================================== */}

      {viewMode === "grid" && prices.length > 0 && (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

          {prices.map((price, index) => (

            <div
              key={price.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10"
            >

              {/* Top gradient */}

              <div
                className={`h-1.5 w-full bg-gradient-to-r ${getServiceColor(
                  index
                )}`}
              />


              <div className="flex flex-1 flex-col p-7">

                {/* Header */}

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${getServiceColor(
                      index
                    )} text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    {getServiceIcon(price.service)}
                  </div>


                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    {getPricingLabel(price.pricingType)}
                  </span>

                </div>


                {/* Service name */}

                <h3 className="mt-7 text-2xl font-black tracking-tight text-slate-900">
                  {price.service}
                </h3>


                {/* Description */}

                <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-500">
                  {price.description ||
                    "Professional printing service from GNF Printing."}
                </p>


                {/* Price */}

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">

                  <div className="flex items-center justify-between px-5 py-4">

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Starting from
                      </p>

                      <p className="mt-1 text-2xl font-black text-slate-900">
                        {getPriceText(price)}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      →
                    </div>

                  </div>

                </div>


                {/* Buttons */}

                <div className="mt-auto flex gap-3 pt-7">

                  <button
                    type="button"
                    onClick={() => openDetails(price)}
                    className="group/button flex-1 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Details
                      <span className="transition-transform group-hover/button:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>


                  {price.pricingType !== "fixed" && (
                    <button
                      type="button"
                      onClick={() => openCalculator(price)}
                      className="flex-1 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30"
                    >
                      Calculate
                    </button>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>
      )}


      {/* =====================================================
          LIST VIEW
      ====================================================== */}

      {viewMode === "list" && prices.length > 0 && (
        <div className="space-y-5">

          {prices.map((price, index) => (

            <div
              key={price.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              <div className="flex flex-col lg:flex-row lg:items-center">

                {/* Color strip */}

                <div
                  className={`h-2 w-full bg-gradient-to-r lg:h-auto lg:w-2 lg:self-stretch ${getServiceColor(
                    index
                  )}`}
                />


                <div className="flex flex-1 flex-col gap-6 p-6 lg:flex-row lg:items-center lg:p-7">

                  {/* Icon */}

                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${getServiceColor(
                      index
                    )} text-3xl shadow-lg transition-transform group-hover:scale-105`}
                  >
                    {getServiceIcon(price.service)}
                  </div>


                  {/* Service info */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-600">
                        {getPricingLabel(price.pricingType)}
                      </span>

                    </div>

                    <h3 className="mt-2 text-xl font-black text-slate-900">
                      {price.service}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                      {price.description ||
                        "Professional printing service from GNF Printing."}
                    </p>

                  </div>


                  {/* Price */}

                  <div className="shrink-0 rounded-2xl bg-slate-50 px-6 py-4 lg:min-w-[210px]">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Starting Price
                    </p>

                    <p className="mt-1 text-xl font-black text-slate-900">
                      {getPriceText(price)}
                    </p>

                  </div>


                  {/* Actions */}

                  <div className="flex shrink-0 gap-3 lg:w-[260px]">

                    <button
                      type="button"
                      onClick={() => openDetails(price)}
                      className="flex-1 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Details
                    </button>


                    {price.pricingType !== "fixed" && (
                      <button
                        type="button"
                        onClick={() => openCalculator(price)}
                        className="flex-1 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                      >
                        Calculate
                      </button>
                    )}

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}


      {/* =====================================================
          DETAILS MODAL
      ====================================================== */}

     {selectedService && (
  <ServiceDetailsModal
    open={true}
    price={selectedService}
    onClose={closeDetails}
    onCalculate={() =>
      openCalculator(selectedService)
    }
  />
)}

      {/* =====================================================
          CALCULATOR MODAL
      ====================================================== */}

      {calculatorService && (
        <PriceCalculator
          price={calculatorService}
          onClose={closeCalculator}
        />
      )}

    </>
  );
}

