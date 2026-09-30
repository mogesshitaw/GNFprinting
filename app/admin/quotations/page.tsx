import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getPrices } from "@/lib/prices";
import { getQuotations } from "@/lib/quotations";

import QuotationManagement from "@/components/QuotationManagement";
import AdminHeader from "@/components/AdminHeader";

export default async function QuotationsPage() {
  const cookieStore = await cookies();

  const authenticated =
    cookieStore.get("gnf_admin")?.value ===
    "authenticated";

  if (!authenticated) {
    redirect("/admin");
  }

  const prices = getPrices();
  const quotations = getQuotations();

  return (
    <main className="min-h-screen bg-slate-50">
      <AdminHeader />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <QuotationManagement
          prices={prices}
          quotations={quotations}
        />
      </section>
    </main>
  );
}