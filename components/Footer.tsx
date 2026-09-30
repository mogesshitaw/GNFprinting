import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Top accent */}
      <div className="h-[3px] bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= MAIN FOOTER ================= */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          
          {/* ================= BRAND ================= */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="group inline-flex flex-col items-center"
            >
              {/* Logo */}
              <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 shadow-lg shadow-blue-500/20 transition duration-300 group-hover:scale-105">
                <div className="relative flex flex-col items-center gap-[3px]">
                  <span className="h-[3px] w-6 rounded-full bg-white/70" />
                  <span className="h-[3px] w-8 rounded-full bg-white" />
                  <span className="h-[3px] w-5 rounded-full bg-white/70" />
                </div>
              </div>

              {/* Brand name */}
              <div className="mt-2 text-center leading-none">
                <div className="text-lg font-extrabold tracking-tight text-white">
                  GNF{" "}
                  <span className="text-cyan-400">
                    Printing
                  </span>
                </div>

                <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Print • Design • Create
                </div>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Professional printing and advertising solutions
              designed to help businesses build a strong and
              memorable brand.
            </p>

            {/* Social buttons */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-sm font-bold text-slate-400 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-sm font-bold text-slate-400 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                ↗
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-sm font-bold text-slate-400 transition hover:border-cyan-500 hover:bg-cyan-500 hover:text-white"
              >
                ◎
              </a>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <div className="mt-6 space-y-4">
              <Link
                href="/"
                className="group flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <span className="h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-3" />
                Home
              </Link>

              <Link
                href="/services"
                className="group flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <span className="h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-3" />
                Services & Prices
              </Link>

              <Link
                href="/about"
                className="group flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <span className="h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-3" />
                About Us
              </Link>

              <Link
                href="/contact"
                className="group flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <span className="h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-3" />
                Contact Us
              </Link>
            </div>
          </div>

          {/* ================= SERVICES ================= */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Our Services
            </h3>

            <div className="mt-6 space-y-4">
              <Link
                href="/services"
                className="block text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Banner Printing
              </Link>

              <Link
                href="/services"
                className="block text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Business Cards
              </Link>

              <Link
                href="/services"
                className="block text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Acrylic Signs
              </Link>

              <Link
                href="/services"
                className="block text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Stickers & Labels
              </Link>

              <Link
                href="/services"
                className="block text-sm text-slate-400 transition hover:text-cyan-400"
              >
                Logo & Graphic Design
              </Link>
            </div>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Get In Touch
            </h3>

            <div className="mt-6 space-y-5">
              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  ☎
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Call Us
                  </p>

                  <a
                    href="tel:+251900000000"
                    className="mt-1 block text-sm font-semibold text-slate-300 transition hover:text-cyan-400"
                  >
                    +251 900 000 000
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  @
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Email
                  </p>

                  <a
                    href="mailto:info@gnfprinting.com"
                    className="mt-1 block text-sm font-semibold text-slate-300 transition hover:text-cyan-400"
                  >
                    info@gnfprinting.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  ◉
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-300">
                    Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-600/10 via-slate-900 to-cyan-500/10 p-6 sm:p-8">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-400">
                HAVE A PROJECT IN MIND?
              </p>

              <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Let&apos;s bring your ideas to life.
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                From business cards to large advertising
                projects, we are ready to help you create
                something professional.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-400"
            >
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
            </Link>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col gap-4 border-t border-slate-800 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-300">
              GNF Printing
            </span>
            . All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/about"
              className="text-slate-500 transition hover:text-white"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-slate-500 transition hover:text-white"
            >
              Contact
            </Link>

            <Link
              href="/services"
              className="text-slate-500 transition hover:text-white"
            >
              Services
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}