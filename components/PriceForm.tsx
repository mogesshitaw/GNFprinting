"use client";

import { useState } from "react";
import { Price, PricingType } from "@/types/price";
import { units } from "@/data/units";

interface PriceFormProps {
  editingPrice: Price | null;
  onSaved: () => void;
  onCancel: () => void;
}

const predefinedUnits = units
  .filter((item) => item.value !== "other")
  .map((item) => item.value);

export default function PriceForm({
  editingPrice,
  onSaved,
  onCancel,
}: PriceFormProps) {
  const editingIsKnownUnit =
    editingPrice
      ? predefinedUnits.includes(editingPrice.unit)
      : false;

  const [service, setService] = useState(
    editingPrice?.service ?? ""
  );

  const [description, setDescription] = useState(
    editingPrice?.description ?? ""
  );

  const [pricingType, setPricingType] =
    useState<PricingType>(
      editingPrice?.pricingType ?? "fixed"
    );

  const [unitPrice, setUnitPrice] = useState(
    editingPrice
      ? String(editingPrice.unitPrice)
      : ""
  );

  const [unit, setUnit] = useState(
    editingPrice
      ? editingIsKnownUnit
        ? editingPrice.unit
        : "other"
      : ""
  );

  const [customUnit, setCustomUnit] =
    useState(
      editingPrice && !editingIsKnownUnit
        ? editingPrice.unit
        : ""
    );

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!service.trim()) {
      alert("Please enter service name.");
      return;
    }

    if (!unitPrice) {
      alert("Please enter unit price.");
      return;
    }

    if (!unit) {
      alert("Please select a unit.");
      return;
    }

    const finalUnit =
      unit === "other"
        ? customUnit.trim()
        : unit;

    if (!finalUnit) {
      alert("Please enter custom unit.");
      return;
    }

    const numericPrice =
      Number(unitPrice);

    if (
      Number.isNaN(numericPrice) ||
      numericPrice < 0
    ) {
      alert("Please enter a valid price.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        ...(editingPrice && {
          id: editingPrice.id,
        }),

        service: service.trim(),

        description:
          description.trim(),

        pricingType,

        unitPrice: numericPrice,

        unit: finalUnit,
      };

      const response = await fetch(
        "/api/prices",
        {
          method: editingPrice
            ? "PUT"
            : "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Failed to save price"
        );
      }

      onSaved();

      if (!editingPrice) {
        setService("");
        setDescription("");
        setPricingType("fixed");
        setUnitPrice("");
        setUnit("");
        setCustomUnit("");
      }
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function getPriceLabel() {
    if (pricingType === "area") {
      return "Price per m²";
    }

    if (pricingType === "volume") {
      return "Price per m³";
    }

    if (pricingType === "quantity") {
      return "Price per unit";
    }

    return "Price";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-6 shadow"
    >
      <h2 className="text-xl font-bold">
        {editingPrice
          ? "Update Price"
          : "Add New Price"}
      </h2>

      <div className="mt-6 space-y-5">
        {/* SERVICE */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Service Name
          </label>

          <input
            type="text"
            placeholder="e.g. Banner Printing"
            value={service}
            onChange={(e) =>
              setService(e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Description
          </label>

          <textarea
            placeholder="Service description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows={3}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* PRICING TYPE */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Pricing Type
          </label>

          <select
            value={pricingType}
            onChange={(e) =>
              setPricingType(
                e.target
                  .value as PricingType
              )
            }
            className="w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="fixed">
              Fixed Price
            </option>

            <option value="quantity">
              Quantity Based
            </option>

            <option value="area">
              Area Based (m²)
            </option>

            <option value="volume">
              Volume Based (m³)
            </option>
          </select>
        </div>

        {/* UNIT */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Measurement Unit
          </label>

          <select
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value)
            }
            className="w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">
              Select measurement unit
            </option>

            {units.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* CUSTOM UNIT */}

        {unit === "other" && (
          <div>
            <label className="mb-1 block text-sm font-medium">
              Custom Unit
            </label>

            <input
              type="text"
              placeholder="e.g. dozen"
              value={customUnit}
              onChange={(e) =>
                setCustomUnit(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        )}

        {/* PRICE */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            {getPriceLabel()}
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 350"
              value={unitPrice}
              onChange={(e) =>
                setUnitPrice(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 pr-20 outline-none focus:border-blue-500"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              ETB
            </span>
          </div>
        </div>

        {/* INFORMATION */}

        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          {pricingType ===
            "fixed" && (
            <p>
              Fixed price service.
              Quantity or dimensions
              are not required.
            </p>
          )}

          {pricingType ===
            "quantity" && (
            <p>
              Customer will enter
              quantity. Example:
              100 pieces × 5 ETB.
            </p>
          )}

          {pricingType ===
            "area" && (
            <p>
              Customer will enter
              width and height.
              Example: 2m × 3m ×
              350 ETB = 2,100 ETB.
            </p>
          )}

          {pricingType ===
            "volume" && (
            <p>
              Customer will enter
              width, height and
              depth.
            </p>
          )}
        </div>

        {/* BUTTONS */}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingPrice
              ? "Update Price"
              : "Add Price"}
          </button>

          {editingPrice && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg bg-gray-200 px-5 py-3 font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}