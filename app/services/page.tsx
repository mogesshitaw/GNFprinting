

import { getPrices } from "@/lib/prices";
import ServicesView from "@/components/ServicesView";

export default function ServicesPage() {
  const prices = getPrices();

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative overflow-hidden bg-slate-950">

        {/* Background */}

        <div className="absolute inset-0">

          <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="hero-grid absolute inset-0 opacity-20" />

        </div>


        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center md:py-28">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-xl shadow-blue-600/20">
            🖨️
          </div>

          <p className="mt-7 font-bold uppercase tracking-[0.2em] text-blue-400">
            GNF PRINTING
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Services &{" "}
            <span className="hero-gradient-text">
              Prices
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Explore our professional printing and advertising
            services. View details, compare prices, and calculate
            your estimated project cost.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 backdrop-blur">
              {prices.length} Services
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 backdrop-blur">
              Professional Quality
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 backdrop-blur">
              Custom Solutions
            </div>

          </div>

        </div>

      </section>


      {/* SERVICES */}

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">

        <ServicesView prices={prices} />

      </section>


      {/* CTA */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="relative overflow-hidden rounded-[2rem] bg-blue-600 px-6 py-14 text-center shadow-2xl shadow-blue-600/20 md:px-12">

          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative">

            <p className="font-bold uppercase tracking-[0.18em] text-blue-100">
              Have a project?
            </p>

            <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
              Let&apos;s bring your idea to life.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-blue-100">
              Contact GNF Printing and tell us what you need.
              We&apos;ll help you find the right printing solution.
            </p>

            <a
              href="/contact"
              className="mt-7 inline-flex rounded-xl bg-white px-7 py-3.5 font-bold text-blue-600 shadow-lg transition hover:-translate-y-1 hover:bg-slate-50"
            >
              Contact Us →
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}
