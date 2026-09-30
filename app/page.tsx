import Link from "next/link";
import { getPrices } from "@/lib/prices";

import HomeServices from "@/components/HomeServices";

export default function HomePage() {
  const prices = getPrices();

  return (
    <main className="overflow-hidden bg-white">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="relative min-h-[680px] overflow-hidden bg-slate-950">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="hero-grid absolute inset-0 opacity-30" />

          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        </div>

        {/* Floating shapes */}
        <div className="hero-float absolute left-[8%] top-32 hidden h-16 w-16 rotate-12 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm md:block" />

        <div className="hero-float-slow absolute right-[10%] top-28 hidden h-20 w-20 -rotate-12 rounded-2xl border border-white/20 bg-blue-500/10 backdrop-blur-sm md:block" />

        <div className="hero-float absolute bottom-28 left-[18%] hidden h-10 w-10 rounded-full border border-cyan-300/20 bg-cyan-300/10 md:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">

          {/* Hero text */}
          <div className="hero-content">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              Professional Printing & Advertising
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              We Turn Your
              <span className="hero-gradient-text block">
                Ideas Into Reality
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              From business cards and banners to signs, branding,
              and custom printing, GNF Printing helps businesses
              and individuals bring their ideas to life.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:bg-blue-500"
              >
                Explore Our Services

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>

            {/* Small stats */}
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
              <div>
                <p className="text-2xl font-bold text-white">
                  Quality
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Printing
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">
                  Fast
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Service
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">
                  Custom
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Solutions
                </p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">

            <div className="hero-card relative">

              {/* Glow */}
              <div className="absolute -inset-6 rounded-[2rem] bg-blue-500/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl sm:p-8">

                {/* Top bar */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <span className="text-xs font-medium text-slate-400">
                    GNF PRINTING
                  </span>
                </div>

                {/* Paper preview */}
                <div className="relative mx-auto aspect-[4/3] max-w-sm overflow-hidden rounded-xl bg-white p-6 shadow-xl">

                  <div className="flex h-full flex-col justify-between">

                    <div>
                      <div className="h-3 w-20 rounded-full bg-blue-600" />

                      <div className="mt-6 h-5 w-4/5 rounded bg-slate-900" />

                      <div className="mt-3 h-3 w-3/5 rounded bg-slate-200" />

                      <div className="mt-8 grid grid-cols-3 gap-3">
                        <div className="aspect-square rounded-lg bg-blue-100" />
                        <div className="aspect-square rounded-lg bg-slate-100" />
                        <div className="aspect-square rounded-lg bg-cyan-100" />
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="h-2 w-20 rounded bg-slate-200" />
                        <div className="mt-2 h-2 w-14 rounded bg-slate-200" />
                      </div>

                      <div className="h-10 w-10 rounded-lg bg-blue-600" />
                    </div>

                  </div>
                </div>

                {/* Service floating cards */}
                <div className="hero-service-card absolute -left-5 top-32 rounded-xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-xl">
                      🖨️
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        Quality Printing
                      </p>
                      <p className="text-xs text-slate-400">
                        Professional finish
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hero-service-card-slow absolute -right-5 bottom-16 rounded-xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-xl">
                      ✨
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        Custom Design
                      </p>
                      <p className="text-xs text-slate-400">
                        Made for you
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================
          ABOUT SECTION
      ========================== */}
      <section className="relative bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Visual */}
            <div className="relative">
              <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-blue-100 blur-2xl" />

              <div className="relative rounded-[2rem] bg-slate-950 p-8 shadow-2xl sm:p-12">

                <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />

                <div className="relative">

                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                    About GNF
                  </p>

                  <h3 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl">
                    Printing ideas.
                    <br />
                    Creating impact.
                  </h3>

                  <p className="mt-6 leading-7 text-slate-400">
                    We combine professional printing, creative design,
                    and modern advertising solutions to help businesses
                    communicate their brand with confidence.
                  </p>

                  <div className="mt-10 grid grid-cols-2 gap-4">

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="text-2xl">🎨</div>
                      <p className="mt-3 font-bold text-white">
                        Creative
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Professional designs
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="text-2xl">🖨️</div>
                      <p className="mt-3 font-bold text-white">
                        Quality
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        High-quality printing
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="text-2xl">⚡</div>
                      <p className="mt-3 font-bold text-white">
                        Fast
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Efficient service
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="text-2xl">🤝</div>
                      <p className="mt-3 font-bold text-white">
                        Reliable
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Customer focused
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>


            {/* Text */}
            <div>

              <p className="font-bold uppercase tracking-[0.18em] text-blue-600">
                About Us
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900 md:text-5xl">
                More than printing.
                <span className="block text-blue-600">
                  We build your brand.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                GNF Printing provides professional printing and
                advertising services for businesses, organizations,
                and individuals.
              </p>

              <p className="mt-5 leading-7 text-slate-500">
                Whether you need a simple document, business cards,
                banners, signs, branding materials, or custom
                advertising products, our goal is to provide a
                clean, professional result that represents you well.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-600">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Professional Results
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      We focus on quality, clarity, and a professional
                      final product.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-600">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Flexible Solutions
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Printing solutions can be adapted to your
                      project and requirements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-600">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Customer Focused
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      We work to understand your needs before
                      producing the final result.
                    </p>
                  </div>
                </div>

              </div>

              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 font-bold text-white transition hover:-translate-y-1 hover:bg-blue-600"
              >
                Learn More About Us
                <span>→</span>
              </Link>

            </div>
          </div>
        </div>
      </section>


      {/* =========================
          SERVICES SECTION
      ========================== */}
      <HomeServices prices={prices} />


      {/* =========================
          WHY CHOOSE US
      ========================== */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="font-bold uppercase tracking-[0.18em] text-blue-600">
              Why GNF Printing
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
              Built around your needs
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              From the first idea to the final printed product,
              we focus on making the process simple and professional.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl transition group-hover:scale-110">
                🎯
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Precision
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Attention to detail from design preparation
                through final production.
              </p>
            </div>


            <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-2xl transition group-hover:scale-110">
                ⚡
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Fast Service
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Efficient workflow designed to keep your project
                moving forward.
              </p>
            </div>


            <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl transition group-hover:scale-110">
                💡
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Creative
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Creative printing and advertising solutions
                for different types of projects.
              </p>
            </div>


            <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl transition group-hover:scale-110">
                🤝
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Reliable
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                A customer-focused approach from project
                discussion to completion.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* =========================
          CTA SECTION
      ========================== */}
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">

        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 text-center">

          <p className="font-bold uppercase tracking-[0.2em] text-blue-400">
            Start Your Project
          </p>

          <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">
            Ready to bring your idea to life?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Tell us what you need and let&apos;s create a professional
            printing solution for your business or project.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/contact"
              className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500"
            >
              Contact Us
            </Link>

            <Link
              href="/services"
              className="rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-white/10"
            >
              View Services
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}