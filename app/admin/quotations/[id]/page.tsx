import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuotations } from "@/lib/quotations";
import QuotationActions from "@/components/QuotationActions";
interface QuotationViewPageProps {
  params: Promise<{
    id: string;
  }>;
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getItemDetails(item: {
  quantity: number;
  width?: number;
  height?: number;
  depth?: number;
  unit: string;
}) {
  if (
    item.width !== undefined &&
    item.height !== undefined
  ) {
    if (item.depth !== undefined) {
      return `${item.width} × ${item.height} × ${item.depth}`;
    }

    return `${item.width} × ${item.height}`;
  }

  if (item.quantity > 1) {
    return `${item.quantity} ${item.unit}`;
  }

  return `1 ${item.unit}`;
}

export default async function QuotationViewPage({
  params,
}: QuotationViewPageProps) {
  const { id } = await params;

  const quotations = getQuotations();

  const quotation = quotations.find(
    (item) => item.id === id
  );

  if (!quotation) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/admin/quotations"
                className="hover:text-blue-600"
              >
                Quotations
              </Link>

              <span>/</span>

              <span>
                {quotation.quotationNumber}
              </span>
            </div>

            <h1 className="text-3xl font-black text-slate-900">
              {quotation.quotationNumber}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Quotation details and services
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/quotations"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              ← Back
            </Link>

            <Link
              href={`/admin/quotations/${quotation.id}/edit`}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              ✏️ Edit Quotation
            </Link>
          </div>
        </div>

        {/* MAIN QUOTATION */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* QUOTATION HEADER */}

          <div className="border-b border-slate-200 bg-slate-950 p-6 text-white md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  GNF PRINTING
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  QUOTATION
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  {quotation.quotationNumber}
                </p>
                  <QuotationActions id={quotation.id} />
              </div>

              <div className="md:text-right">
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold capitalize text-white">
                  {quotation.status}
                </span>

                <p className="mt-3 text-sm text-slate-400">
                  Issued:{" "}
                  <span className="text-white">
                    {formatDate(
                      quotation.issueDate
                    )}
                  </span>
                </p>

                {quotation.validUntil && (
                  <p className="mt-1 text-sm text-slate-400">
                    Valid until:{" "}
                    <span className="text-white">
                      {formatDate(
                        quotation.validUntil
                      )}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* CUSTOMER */}

          <div className="grid gap-8 border-b border-slate-200 p-6 md:grid-cols-2 md:p-8">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Bill To
              </p>

              <h3 className="text-xl font-bold text-slate-900">
                {quotation.customerName}
              </h3>

              {quotation.contactPerson && (
                <p className="mt-2 text-sm text-slate-600">
                  Contact:{" "}
                  {quotation.contactPerson}
                </p>
              )}

              {quotation.phone && (
                <p className="mt-1 text-sm text-slate-600">
                  Phone: {quotation.phone}
                </p>
              )}

              {quotation.email && (
                <p className="mt-1 text-sm text-slate-600">
                  Email: {quotation.email}
                </p>
              )}
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Project
              </p>

              <h3 className="text-xl font-bold text-slate-900">
                {quotation.projectTitle}
              </h3>

              {quotation.deliveryTime && (
                <p className="mt-3 text-sm text-slate-600">
                  <strong>Delivery:</strong>{" "}
                  {quotation.deliveryTime}
                </p>
              )}

              {quotation.paymentTerms && (
                <p className="mt-1 text-sm text-slate-600">
                  <strong>Payment:</strong>{" "}
                  {quotation.paymentTerms}
                </p>
              )}
            </div>
          </div>

          {/* SERVICES */}

          <div className="p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Services
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {quotation.items.length} service
                  {quotation.items.length !== 1
                    ? "s"
                    : ""}{" "}
                  included
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">
                      #
                    </th>

                    <th className="px-5 py-4">
                      Service
                    </th>

                    <th className="px-5 py-4">
                      Details
                    </th>

                    <th className="px-5 py-4">
                      Unit Price
                    </th>

                    <th className="px-5 py-4 text-right">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {quotation.items.map(
                    (item, index) => (
                      <tr
                        key={item.id}
                        className="border-t border-slate-100"
                      >
                        <td className="px-5 py-5 text-sm font-bold text-slate-400">
                          {index + 1}
                        </td>

                        <td className="px-5 py-5">
                          <p className="font-bold text-slate-900">
                            {item.service}
                          </p>

                          <p className="mt-1 max-w-sm text-xs text-slate-500">
                            {item.description}
                          </p>
                        </td>

                        <td className="px-5 py-5 text-sm text-slate-600">
                          {getItemDetails(item)}
                        </td>

                        <td className="px-5 py-5 text-sm font-semibold text-slate-700">
                          {money(
                            item.unitPrice
                          )}{" "}
                          ETB / {item.unit}
                        </td>

                        <td className="px-5 py-5 text-right font-bold text-slate-900">
                          {money(
                            item.total
                          )}{" "}
                          ETB
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* TOTALS */}

            <div className="mt-8 flex justify-end">
              <div className="w-full max-w-md rounded-2xl bg-slate-50 p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      {money(
                        quotation.subtotal
                      )}{" "}
                      ETB
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Discount
                    </span>

                    <span className="font-semibold text-red-600">
                      -{" "}
                      {money(
                        quotation.discount
                      )}{" "}
                      ETB
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Tax
                    </span>

                    <span className="font-semibold">
                      +{" "}
                      {money(
                        quotation.tax
                      )}{" "}
                      ETB
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex items-end justify-between">
                      <span className="font-bold text-slate-900">
                        Grand Total
                      </span>

                      <span className="text-2xl font-black text-blue-600">
                        {money(
                          quotation.grandTotal
                        )}{" "}
                        ETB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NOTES */}

          {quotation.notes && (
            <div className="border-t border-slate-200 p-6 md:p-8">
              <h2 className="mb-3 text-lg font-bold text-slate-900">
                Notes
              </h2>

              <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {quotation.notes}
              </div>
            </div>
          )}

          {/* FOOTER */}

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 text-center text-xs text-slate-400">
            GNF Printing — Quotation{" "}
            {quotation.quotationNumber}
          </div>
        </div>
      </div>
    </main>
  );
}

