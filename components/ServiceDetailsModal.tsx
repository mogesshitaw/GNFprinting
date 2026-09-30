"use client";

import { Price } from "@/types/price";

interface ServiceDetailsModalProps {
  price: Price;
  onClose: () => void;
  onCalculate: () => void;
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

function getUnitLabel(unit: string) {
  switch (unit) {
    case "piece":
      return "Piece (pc)";

    case "m":
      return "Meter (m)";

    case "m2":
      return "Square Meter (m²)";

    case "m3":
      return "Cubic Meter (m³)";

    case "cm":
      return "Centimeter (cm)";

    case "cm2":
      return "Square Centimeter (cm²)";

    case "kg":
      return "Kilogram (kg)";

    case "g":
      return "Gram (g)";

    case "liter":
      return "Liter (L)";

    case "ml":
      return "Milliliter (ml)";

    case "sheet":
      return "Sheet";

    case "roll":
      return "Roll";

    case "set":
      return "Set";

    case "box":
      return "Box";

    case "pack":
      return "Pack";

    case "hour":
      return "Hour";

    case "day":
      return "Day";

    case "service":
      return "Service";

    default:
      return unit;
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

  return `${price.unitPrice.toLocaleString()} ETB / ${getUnitLabel(
    price.unit
  )}`;
}

export default function ServiceDetailsModal({
  price,
  onClose,
  onCalculate,
}: ServiceDetailsModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="flex items-center justify-between border-b p-6">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              GNF PRINTING
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {price.service}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 hover:bg-gray-200"
          >
            ×
          </button>
        </div>

        {/* CONTENT */}

        <div className="space-y-6 p-6">
          {price.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Description
              </h3>

              <p className="mt-2 leading-6 text-gray-600">
                {price.description}
              </p>
            </div>
          )}

          {/* DETAILS */}

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">
                Pricing Type
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {getPricingLabel(
                  price.pricingType
                )}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">
                Unit
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {getUnitLabel(price.unit)}
              </p>
            </div>
          </div>

          {/* PRICE */}

          <div className="rounded-xl bg-blue-50 p-5">
            <p className="text-sm text-blue-600">
              Starting Price
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-700">
              {getPriceText(price)}
            </p>
          </div>

          {/* CALCULATION INFORMATION */}

          {price.pricingType === "quantity" && (
            <div className="rounded-xl border p-4">
              <h3 className="font-semibold">
                How is the price calculated?
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Total price = Quantity × Price per unit.
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Example: 100 pieces ×{" "}
                {price.unitPrice.toLocaleString()} ETB
              </p>
            </div>
          )}

          {price.pricingType === "area" && (
            <div className="rounded-xl border p-4">
              <h3 className="font-semibold">
                How is the price calculated?
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Total price = Width × Height × Price per m².
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Example: 2m × 3m ×{" "}
                {price.unitPrice.toLocaleString()} ETB
              </p>
            </div>
          )}

          {price.pricingType === "volume" && (
            <div className="rounded-xl border p-4">
              <h3 className="font-semibold">
                How is the price calculated?
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Total price = Width × Height × Depth × Price per m³.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className="flex gap-3 border-t p-6">
          {price.pricingType !== "fixed" && (
            <button
              type="button"
              onClick={onCalculate}
              className="flex-1 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Calculate Price
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg bg-gray-100 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}