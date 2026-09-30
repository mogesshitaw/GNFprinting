"use client";

import { Price } from "@/types/price";

interface PriceTableProps {
  prices: Price[];
  onEdit: (price: Price) => void;
  onDelete: (id: number) => void;
}

function getPricingLabel(
  pricingType: Price["pricingType"]
) {
  switch (pricingType) {
    case "fixed":
      return "Fixed";

    case "quantity":
      return "Quantity";

    case "area":
      return "Area";

    case "volume":
      return "Volume";

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

function getPriceDescription(
  price: Price
) {
  if (price.pricingType === "fixed") {
    return "Fixed price";
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

export default function PriceTable({
  prices,
  onEdit,
  onDelete,
}: PriceTableProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold">
                Service
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Pricing
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Unit
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Price
              </th>

              <th className="px-4 py-4 text-right text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {prices.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  No prices available.
                </td>
              </tr>
            ) : (
              prices.map((price) => (
                <tr
                  key={price.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    <div className="font-semibold">
                      {price.service}
                    </div>

                    {price.description && (
                      <div className="mt-1 text-sm text-gray-500">
                        {price.description}
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {getPricingLabel(
                        price.pricingType
                      )}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm">
                    {getUnitLabel(
                      price.unit
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-semibold">
                      {getPriceDescription(
                        price
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(price)
                        }
                        className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-200"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(
                            price.id
                          )
                        }
                        className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}