import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getPrices } from "@/lib/prices";
import PriceManagement from "@/components/PriceManagement";
import AdminHeader from "@/components/AdminHeader";
export const dynamic = "force-dynamic";

export default async function AdminPricesPage() {
  const cookieStore = await cookies();

  const isAuthenticated =
    cookieStore.get("gnf_admin")?.value === "authenticated";

  if (!isAuthenticated) {
    redirect("/admin");
  }

  const prices = getPrices();

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <AdminHeader />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Price Management
          </h1>

          <p className="mt-2 text-gray-500">
            Add, update and delete printing service prices.
          </p>
        </div>

        <PriceManagement initialPrices={prices} />
      </div>
    </main>
  );
}