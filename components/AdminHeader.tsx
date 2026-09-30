"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const isPrices =
    pathname === "/admin/prices";

  const isQuotations =
    pathname === "/admin/quotations";

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-4">
          {/* BRAND */}
          <Link
            href="/admin/prices"
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-slate-950 shadow-lg shadow-blue-500/10 transition duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 opacity-90" />

              <div className="relative flex flex-col items-center gap-[2px]">
                <span className="h-[3px] w-5 rounded-full bg-white/70" />
                <span className="h-[3px] w-6 rounded-full bg-white" />
                <span className="h-[3px] w-4 rounded-full bg-white/70" />
              </div>
            </div>

            <div className="leading-none">
              <p className="text-lg font-black tracking-tight text-slate-950">
                GNF{" "}
                <span className="text-blue-600">
                  Printing
                </span>
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Admin Panel
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden items-center gap-2 md:flex">
            <AdminNavLink
              href="/admin/prices"
              active={isPrices}
              icon="💰"
            >
              Price Management
            </AdminNavLink>

            <AdminNavLink
              href="/admin/quotations"
              active={isQuotations}
              icon="📄"
            >
              Quotation Management
            </AdminNavLink>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
            >
              View Website
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:border-red-300 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        <div className="flex gap-2 overflow-x-auto border-t border-slate-100 py-3 md:hidden">
          <MobileNavLink
            href="/admin/prices"
            active={isPrices}
          >
            💰 Prices
          </MobileNavLink>

          <MobileNavLink
            href="/admin/quotations"
            active={isQuotations}
          >
            📄 Quotations
          </MobileNavLink>

          <Link
            href="/"
            className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            🌐 Website
          </Link>
        </div>
      </div>
    </header>
  );
}

/* DESKTOP NAV ITEM */

function AdminNavLink({
  href,
  active,
  icon,
  children,
}: {
  href: string;
  active: boolean;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
        active
          ? "bg-blue-50 text-blue-700"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <span className="text-base">
        {icon}
      </span>

      <span>{children}</span>

      {active && (
        <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-blue-600" />
      )}
    </Link>
  );
}

/* MOBILE NAV ITEM */

function MobileNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold transition ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {children}
    </Link>
  );
}