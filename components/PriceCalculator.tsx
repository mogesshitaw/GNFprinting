"use client";

import { useMemo, useState } from "react";
import { Price } from "@/types/price";

interface PriceCalculatorProps {
  price: Price;
  onClose: () => void;
}

export default function PriceCalculator({
  price,
  onClose,
}: PriceCalculatorProps) {
  const [quantity, setQuantity] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");

  const total = useMemo(() => {
    const unitPrice = price.unitPrice;

    if (price.pricingType === "fixed") {
      return unitPrice;
    }

    if (price.pricingType === "quantity") {
      const qty = Number(quantity);

      if (!qty || qty <= 0) {
        return 0;
      }

      return qty * unitPrice;
    }

    if (price.pricingType === "area") {
      const w = Number(width);
      const h = Number(height);

      if (!w || !h || w <= 0 || h <= 0) {
        return 0;
      }

      return w * h * unitPrice;
    }

    if (price.pricingType === "volume") {
      const w = Number(width);
      const h = Number(height);
      const d = Number(depth);

      if (
        !w ||
        !h ||
        !d ||
        w <= 0 ||
        h <= 0 ||
        d <= 0
      ) {
        return 0;
      }

      return w * h * d * unitPrice;
    }

    return 0;
  }, [
    price,
    quantity,
    width,
    height,
    depth,
  ]);

  function formatMoney(amount: number) {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function handleOverlayClick(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b p-6">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              PRICE CALCULATOR
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

        <div className="space-y-5 p-6">
          {/* FIXED */}

          {price.pricingType === "fixed" && (
            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Fixed Price
              </p>

              <p className="mt-1 text-3xl font-bold">
                {formatMoney(price.unitPrice)} ETB
              </p>
            </div>
          )}

          {/* QUANTITY */}

          {price.pricingType === "quantity" && (
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Quantity
              </label>

              <input
                type="number"
                min="0"
                step="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
                placeholder={`Enter quantity (${price.unit})`}
                className="w-full rounded-lg border px-4 py-3 text-lg outline-none focus:border-blue-500"
                autoFocus
              />

              <p className="mt-2 text-sm text-gray-500">
                Price per {price.unit}:{" "}
                <strong>
                  {formatMoney(price.unitPrice)} ETB
                </strong>
              </p>
            </div>
          )}

          {/* AREA */}

          {price.pricingType === "area" && (
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Width (m)
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={width}
                    onChange={(e) =>
                      setWidth(e.target.value)
                    }
                    placeholder="e.g. 2"
                    className="w-full rounded-lg border px-4 py-3 text-lg outline-none focus:border-blue-500"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Height (m)
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={height}
                    onChange={(e) =>
                      setHeight(e.target.value)
                    }
                    placeholder="e.g. 3"
                    className="w-full rounded-lg border px-4 py-3 text-lg outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Price per m²
                </p>

                <p className="font-semibold">
                  {formatMoney(price.unitPrice)} ETB
                </p>
              </div>
            </div>
          )}

          {/* VOLUME */}

          {price.pricingType === "volume" && (
            <div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Width
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={width}
                    onChange={(e) =>
                      setWidth(e.target.value)
                    }
                    placeholder="W"
                    className="w-full rounded-lg border px-3 py-3 outline-none focus:border-blue-500"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Height
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={height}
                    onChange={(e) =>
                      setHeight(e.target.value)
                    }
                    placeholder="H"
                    className="w-full rounded-lg border px-3 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Depth
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={depth}
                    onChange={(e) =>
                      setDepth(e.target.value)
                    }
                    placeholder="D"
                    className="w-full rounded-lg border px-3 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Price per m³
                </p>

                <p className="font-semibold">
                  {formatMoney(price.unitPrice)} ETB
                </p>
              </div>
            </div>
          )}

          {/* TOTAL */}

          <div className="rounded-xl bg-blue-600 p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">
                  Estimated Total
                </p>

                <p className="mt-1 text-3xl font-bold">
                  {formatMoney(total)} ETB
                </p>
              </div>

              <div className="text-4xl">
                ETB
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500">
            This is an estimated price. Final price may
            depend on the selected material and design.
          </p>
        </div>

        {/* FOOTER */}

        <div className="border-t p-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-gray-100 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}