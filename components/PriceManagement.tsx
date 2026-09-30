"use client";

import { useState } from "react";
import { Price } from "@/types/price";
import PriceForm from "@/components/PriceForm";
import PriceTable from "@/components/PriceTable";

interface PriceManagementProps {
  initialPrices: Price[];
}

export default function PriceManagement({
  initialPrices,
}: PriceManagementProps) {
  const [prices, setPrices] = useState<Price[]>(
    initialPrices
  );

  const [editingPrice, setEditingPrice] =
    useState<Price | null>(null);

  const [loading, setLoading] = useState(false);

  async function refreshPrices() {
    const response = await fetch("/api/prices");

    if (!response.ok) {
      throw new Error("Failed to load prices");
    }

    const data: Price[] = await response.json();

    setPrices(data);
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this price?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/prices", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete price");
      }

      await refreshPrices();

      if (editingPrice?.id === id) {
        setEditingPrice(null);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete price.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaved() {
    try {
      setLoading(true);

      await refreshPrices();

      setEditingPrice(null);
    } catch (error) {
      console.error(error);
      alert("Failed to refresh prices.");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(price: Price) {
    setEditingPrice(price);
  }

  function handleCancel() {
    setEditingPrice(null);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="font-semibold text-blue-600">
          GNF PRINTING
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Price Management
        </h1>

        <p className="mt-3 text-gray-600">
          Add, update and delete printing service prices.
        </p>
      </div>

      {loading && (
        <div className="mb-5 rounded-lg bg-blue-50 px-4 py-3 text-blue-700">
          Processing...
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div>
          <PriceForm
            key={editingPrice?.id ?? "new"}
            editingPrice={editingPrice}
            onSaved={handleSaved}
            onCancel={handleCancel}
          />
        </div>

        <div className="lg:col-span-2">
          <PriceTable
            prices={prices}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
}