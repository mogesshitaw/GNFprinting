/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useState } from "react";
import { Price } from "@/types/price";
import PriceForm from "./PriceForm";

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

interface PriceManagementProps {
  initialPrices: Price[];
}

export default function PriceManagement({
  initialPrices,
}: PriceManagementProps) {
  const [prices, setPrices] =
    useState<Price[]>(initialPrices);

  const [editingPrice, setEditingPrice] =
    useState<Price | null>(null);

  const [loading, setLoading] = useState(false);

  async function loadPrices() {
    try {
      setLoading(true);

      const response = await fetch("/api/prices", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load prices."
        );
      }

      setPrices(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(error);

      alert("Failed to load services.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteService(price: Price) {
    const confirmed = window.confirm(
      `Delete "${price.service}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/prices", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: price.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to delete service."
        );
      }

      if (editingPrice?.id === price.id) {
        setEditingPrice(null);
      }

      await loadPrices();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete service."
      );
    }
  }

  return (
    <div className="space-y-8">
      {/* =========================
          PRICE FORM
      ========================== */}

      <PriceForm
        key={editingPrice?.id ?? "new"}
        price={editingPrice}
        onSaved={() => {
          setEditingPrice(null);
          loadPrices();
        }}
        onCancel={
          editingPrice
            ? () => setEditingPrice(null)
            : undefined
        }
      />

      {/* =========================
          SERVICES TABLE
      ========================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Services & Prices
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your printing services,
              prices and images.
            </p>
          </div>

          <div className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            {prices.length} Services
          </div>
        </div>

        {/* =========================
            LOADING
        ========================== */}

        {loading ? (
          <div className="py-12 text-center text-slate-500">
            Loading services...
          </div>
        ) : prices.length === 0 ? (
          /* =========================
             EMPTY STATE
          ========================== */

          <div className="rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
            <p className="font-semibold text-slate-700">
              No services found.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Create your first service above.
            </p>
          </div>
        ) : (
          /* =========================
             SERVICES TABLE
          ========================== */

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-4 py-4 text-sm font-bold text-slate-600">
                    Image
                  </th>

                  <th className="px-4 py-4 text-sm font-bold text-slate-600">
                    Service
                  </th>

                  <th className="px-4 py-4 text-sm font-bold text-slate-600">
                    Type
                  </th>

                  <th className="px-4 py-4 text-sm font-bold text-slate-600">
                    Price
                  </th>

                  <th className="px-4 py-4 text-sm font-bold text-slate-600">
                    Unit
                  </th>

                  <th className="px-4 py-4 text-sm font-bold text-slate-600">
                    Images
                  </th>

                  <th className="px-4 py-4 text-right text-sm font-bold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {prices.map((price) => (
                  <tr
                    key={price.id}
                    className="border-b border-slate-100"
                  >
                    {/* IMAGE */}

                    <td className="px-4 py-4">
                      {price.images?.[0] ? (
                        <img
                          src={price.images[0]}
                          alt={price.service}
                          className="h-14 w-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-100 text-xl">
                          🖼️
                        </div>
                      )}
                    </td>

                    {/* SERVICE */}

                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900">
                        {price.service}
                      </div>

                      <div className="mt-1 max-w-xs truncate text-sm text-slate-500">
                        {price.description}
                      </div>
                    </td>

                    {/* PRICING TYPE */}

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                        {price.pricingType}
                      </span>
                    </td>

                    {/* PRICE */}

                    <td className="px-4 py-4 font-semibold text-slate-900">
                      {money(price.unitPrice)} ETB
                    </td>

                    {/* UNIT */}

                    <td className="px-4 py-4 text-slate-600">
                      {price.unit}
                    </td>

                    {/* IMAGE COUNT */}

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {price.images?.length || 0}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setEditingPrice(price)
                          }
                          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteService(price)
                          }
                          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}