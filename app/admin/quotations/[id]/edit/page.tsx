import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuotations } from "@/lib/quotations";
import { getPrices } from "@/lib/prices";
import EditQuotationForm from "@/components/EditQuotationForm";

interface EditQuotationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditQuotationPage({
  params,
}: EditQuotationPageProps) {
  const { id } = await params;

  const quotations = getQuotations();
  const quotation = quotations.find(
    (item) => item.id === id
  );

  if (!quotation) {
    notFound();
  }

  const prices = getPrices();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/admin/quotations"
                className="hover:text-blue-600"
              >
                Quotations
              </Link>

              <span>/</span>

              <Link
                href={`/admin/quotations/${quotation.id}`}
                className="hover:text-blue-600"
              >
                {quotation.quotationNumber}
              </Link>

              <span>/</span>

              <span>Edit</span>
            </div>

            <h1 className="text-3xl font-black text-slate-900">
              Edit Quotation
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {quotation.quotationNumber}
            </p>
          </div>

          <Link
            href={`/admin/quotations/${quotation.id}`}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← View Quotation
          </Link>
        </div>

        <EditQuotationForm
          quotation={quotation}
          prices={prices}
        />
      </div>
    </main>
  );
}