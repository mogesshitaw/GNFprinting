"use client";

import { useState } from "react";
import { Price } from "@/types/price";
import { Quotation } from "@/types/quotation";
import QuotationForm from "./QuotationForm";
import Link from "next/link";

interface Props {
  prices: Price[];
  quotations: Quotation[];
}

export default function QuotationManagement({
  prices,
  quotations: initialQuotations,
}: Props) {
  const [quotations, setQuotations] =
    useState(initialQuotations);

  const [showForm, setShowForm] =
    useState(false);

  async function refresh() {
    const response = await fetch(
      "/api/quotations",
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      const data = await response.json();

      setQuotations(data);
    }
  }

  async function deleteQuotation(
    id: string
  ) {
    const confirmed = window.confirm(
      "Delete this quotation?"
    );

    if (!confirmed) {
      return;
    }

    const response = await fetch(
      "/api/quotations",
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ id }),
      }
    );

    if (response.ok) {
      await refresh();
    }
  }

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            GNF PRINTING
          </p>

          <h1 className="mt-1 text-3xl font-black text-slate-900">
            Quotation Management
          </h1>

          <p className="mt-2 text-slate-500">
            Create and manage customer quotations.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowForm((current) => !current)
          }
          className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          {showForm
            ? "Close Form"
            : "+ New Quotation"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="mb-10">
          <QuotationForm
            prices={prices}
            onSaved={async () => {
              await refresh();
              setShowForm(false);
            }}
          />
        </div>
      )}

      {/* LIST */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-900">
            Quotations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {quotations.length} quotation
            {quotations.length === 1
              ? ""
              : "s"}
          </p>
        </div>

        {quotations.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              📄
            </div>

            <h3 className="mt-5 font-bold text-slate-900">
              No quotations yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create your first customer quotation.
            </p>

            <button
              type="button"
              onClick={() =>
                setShowForm(true)
              }
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
            >
              + Create Quotation
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">
                    Quotation
                  </th>

                  <th className="px-6 py-4">
                    Customer
                  </th>

                  <th className="px-6 py-4">
                    Date
                  </th>

                  <th className="px-6 py-4">
                    Total
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {quotations.map(
                  (quotation) => (
                    <tr
                      key={quotation.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <p className="font-bold text-slate-900">
                          {
                            quotation.quotationNumber
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {quotation.projectTitle ||
                            "No project title"}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-semibold text-slate-900">
                          {
                            quotation.customerName
                          }
                        </p>

                        {(quotation.phone || quotation.email || quotation.contactPerson) && (
                          <p className="text-xs text-slate-500">
                            {[quotation.contactPerson, quotation.phone, quotation.email]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {quotation.issueDate}
                      </td>

                      <td className="px-6 py-5 font-bold text-slate-900">
                        {quotation.grandTotal.toLocaleString()}{" "}
                        ETB
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize text-slate-600">
                          {quotation.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex gap-2">
                         <Link
  href={`/admin/quotations/${quotation.id}`}
  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
>
  View
</Link>

<Link
  href={`/admin/quotations/${quotation.id}/edit`}
  className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
>
  Edit
</Link>

                          <button
                            type="button"
                            onClick={() =>
                              deleteQuotation(
                                quotation.id
                              )
                            }
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}