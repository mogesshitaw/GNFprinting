"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const logoClickCount = useRef(0);
  const logoClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleKeyboardShortcut(event: KeyboardEvent) {
      // Ctrl + Shift + L → Admin
      if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "l"
      ) {
        event.preventDefault();
        router.push("/admin");
      }
    }

    window.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, [router]);

  function handleLogoClick() {
    logoClickCount.current += 1;

    if (logoClickTimer.current) {
      clearTimeout(logoClickTimer.current);
    }

    logoClickTimer.current = setTimeout(() => {
      logoClickCount.current = 0;
    }, 1500);

    // Five clicks → Admin
    if (logoClickCount.current >= 5) {
      logoClickCount.current = 0;

      if (logoClickTimer.current) {
        clearTimeout(logoClickTimer.current);
      }

      router.push("/admin");
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      {/* Top accent line */}
      <div className="h-[3px] bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[74px] items-center justify-between">
          
          {/* ================= LOGO ================= */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-3"
            aria-label="GNF Printing Home"
          >
            {/* Logo mark */}
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-slate-950 shadow-lg shadow-blue-500/10 transition duration-300 group-hover:scale-105">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 opacity-90" />

              {/* Printing sheets */}
              <div className="relative flex flex-col items-center gap-[2px]">
                <span className="h-[3px] w-5 rounded-full bg-white/70" />
                <span className="h-[3px] w-6 rounded-full bg-white" />
                <span className="h-[3px] w-4 rounded-full bg-white/70" />
              </div>
            </div>

            {/* Logo text */}
            <div className=" xs:block">
              <div className="text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl">
                GNF<span className="text-blue-600">.</span>
              </div>

              <div className="-mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Printing
              </div>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  {item.name}

                  {/* Active indicator */}
                  <span
                    className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-300 ${
                      isActive
                        ? "w-5"
                        : "w-0 group-hover:w-5"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ================= DESKTOP CTA ================= */}
          <div className="hidden md:flex">
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get a Quote

                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 md:hidden"
          >
            {menuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 md:hidden ${
          menuOpen
            ? "max-h-[420px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  <span>{item.name}</span>

                  <svg
                    className={`h-4 w-4 transition ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              );
            })}
          </nav>

          {/* Mobile CTA */}
          <div className="mt-3 border-t border-slate-100 pt-3">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Get a Quote

              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}