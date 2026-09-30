export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-slate-950">

        {/* Background effects */}

        <div className="absolute inset-0">

          <div className="absolute left-[-10%] top-[-20%] h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="hero-grid absolute inset-0 opacity-20" />

        </div>


        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Text */}

            <div className="about-hero-content">

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />

                ABOUT GNF PRINTING
              </div>


              <h1 className="mt-7 text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">

                More Than
                <span className="hero-gradient-text block">
                  Printing.
                </span>

                We Build Your
                <span className="block text-blue-400">
                  Brand.
                </span>

              </h1>


              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                GNF Printing provides professional printing,
                advertising, branding, and customized solutions
                designed to help businesses and individuals
                communicate their ideas with confidence.
              </p>


              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <a
                  href="/services"
                  className="rounded-xl bg-blue-600 px-7 py-4 text-center font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500"
                >
                  Explore Our Services →
                </a>

                <a
                  href="/contact"
                  className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-center font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Talk to Us
                </a>

              </div>

            </div>


            {/* Visual */}

            <div className="relative mx-auto w-full max-w-lg">

              <div className="about-main-card relative">

                {/* Glow */}

                <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />


                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8">

                  {/* Top */}

                  <div className="flex items-center justify-between">

                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400" />
                      <span className="h-3 w-3 rounded-full bg-green-400" />
                    </div>

                    <span className="text-xs font-bold tracking-widest text-slate-500">
                      GNF
                    </span>

                  </div>


                  {/* Main design */}

                  <div className="mt-8 rounded-2xl bg-white p-6 shadow-xl sm:p-8">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                          GNF PRINTING
                        </p>

                        <div className="mt-3 h-3 w-32 rounded-full bg-slate-900" />

                        <div className="mt-2 h-2 w-24 rounded-full bg-slate-200" />
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-2xl">
                        🖨️
                      </div>

                    </div>


                    <div className="mt-8 grid grid-cols-2 gap-3">

                      <div className="h-28 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400" />

                      <div className="h-28 rounded-xl bg-slate-100 p-4">
                        <div className="h-3 w-16 rounded bg-slate-800" />
                        <div className="mt-3 h-2 w-full rounded bg-slate-200" />
                        <div className="mt-2 h-2 w-4/5 rounded bg-slate-200" />
                      </div>

                    </div>


                    <div className="mt-5 flex items-center justify-between">

                      <div>
                        <div className="h-2 w-24 rounded bg-slate-200" />
                        <div className="mt-2 h-2 w-16 rounded bg-slate-200" />
                      </div>

                      <div className="h-10 w-10 rounded-lg bg-slate-900" />

                    </div>

                  </div>


                  {/* Bottom label */}

                  <div className="mt-5 flex items-center justify-between">

                    <div>
                      <p className="text-sm font-bold text-white">
                        Ideas → Design → Print
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Turning concepts into reality
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      ✨
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="bg-white py-20 md:py-28">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

            {/* Text */}

            <div>

              <p className="font-bold uppercase tracking-[0.18em] text-blue-600">
                Who We Are
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900 md:text-5xl">
                A printing partner for
                <span className="block text-blue-600">
                  your next idea.
                </span>
              </h2>

              <p className="mt-7 text-lg leading-8 text-slate-600">
                GNF Printing is a professional printing and
                advertising service provider dedicated to
                delivering quality printing solutions for
                individuals, businesses, organizations, and
                creative projects.
              </p>

              <p className="mt-5 leading-8 text-slate-500">
                We understand that printed materials are more
                than ink and paper. A business card represents
                your identity. A banner represents your business.
                A sign represents your brand. That is why we focus
                on combining quality production with clean,
                professional presentation.
              </p>

              <p className="mt-5 leading-8 text-slate-500">
                From everyday printing requirements to customized
                advertising projects, we work to provide practical
                solutions that match each customer&apos;s needs.
              </p>

            </div>


            {/* Feature panel */}

            <div className="relative">

              <div className="absolute -inset-4 rounded-[2rem] bg-blue-100/60 blur-2xl" />

              <div className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-xl sm:p-9">

                <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                  Our Approach
                </p>

                <div className="mt-8 space-y-7">

                  <div className="flex gap-5">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl text-white shadow-lg shadow-blue-600/20">
                      💡
                    </div>

                    <div>
                      <h3 className="font-black text-slate-900">
                        Understand
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        We first understand what you need and
                        what you want your final product to achieve.
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-5">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-xl text-white shadow-lg shadow-cyan-500/20">
                      🎨
                    </div>

                    <div>
                      <h3 className="font-black text-slate-900">
                        Create
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        We prepare designs and production solutions
                        suited to your project.
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-5">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-xl text-white shadow-lg shadow-violet-600/20">
                      🖨️
                    </div>

                    <div>
                      <h3 className="font-black text-slate-900">
                        Produce
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Your approved design is transformed into
                        a professional printed product.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <section className="border-y border-slate-200 bg-slate-50">

        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-12 md:grid-cols-4 md:py-16">

          <div className="border-r border-slate-200 px-5 text-center md:px-8">
            <p className="text-3xl font-black text-slate-900 md:text-4xl">
              Quality
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Focused production
            </p>
          </div>

          <div className="px-5 text-center md:border-r md:border-slate-200 md:px-8">
            <p className="text-3xl font-black text-slate-900 md:text-4xl">
              Custom
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Printing solutions
            </p>
          </div>

          <div className="border-r border-slate-200 px-5 pt-8 text-center md:border-r-0 md:px-8 md:pt-0">
            <p className="text-3xl font-black text-slate-900 md:text-4xl">
              Flexible
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Project requirements
            </p>
          </div>

          <div className="px-5 pt-8 text-center md:px-8 md:pt-0">
            <p className="text-3xl font-black text-slate-900 md:text-4xl">
              Reliable
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Customer service
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES / CAPABILITIES
      ====================================================== */}

      <section className="bg-white py-20 md:py-28">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="font-bold uppercase tracking-[0.18em] text-blue-600">
              What We Do
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
              Printing solutions for different needs
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Our services cover everyday printing, business
              branding, advertising materials, and customized
              projects.
            </p>

          </div>


          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Card */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl transition group-hover:scale-110">
                🖨️
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                Digital Printing
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Professional printing for documents,
                promotional materials, and everyday business needs.
              </p>

            </div>


            <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-2xl transition group-hover:scale-110">
                🖼️
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                Banner Printing
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Large-format printing for promotions,
                events, businesses, and outdoor advertising.
              </p>

            </div>


            <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl transition group-hover:scale-110">
                💳
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                Business Cards
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Professional business cards that help present
                your identity and brand clearly.
              </p>

            </div>


            <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl transition group-hover:scale-110">
                🪧
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                Signs & Advertising
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Custom signs and advertising materials designed
                to make your business visible.
              </p>

            </div>


            <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-pink-200 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-2xl transition group-hover:scale-110">
                🏷️
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                Stickers & Labels
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Customized stickers and labels for products,
                packaging, promotions, and branding.
              </p>

            </div>


            <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl transition group-hover:scale-110">
                ✨
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                Custom Projects
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Customized printing solutions based on your
                specific design, size, material, and requirements.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MISSION & VISION
      ====================================================== */}

      <section className="bg-slate-950 py-20 md:py-28">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-7 md:grid-cols-2">

            {/* Mission */}

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 md:p-10">

              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl">
                  🎯
                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-blue-400">
                  Our Mission
                </p>

                <h2 className="mt-3 text-3xl font-black text-white">
                  Turning ideas into quality results.
                </h2>

                <p className="mt-5 leading-8 text-slate-400">
                  Our mission is to provide accessible,
                  professional, and reliable printing and
                  advertising solutions while understanding
                  the unique needs of every customer.
                </p>

              </div>

            </div>


            {/* Vision */}

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 md:p-10">

              <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500 text-2xl">
                  🔭
                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">
                  Our Vision
                </p>

                <h2 className="mt-3 text-3xl font-black text-white">
                  Becoming a trusted printing partner.
                </h2>

                <p className="mt-5 leading-8 text-slate-400">
                  We aim to build lasting customer relationships
                  by continuously improving our services,
                  embracing modern solutions, and delivering
                  professional results.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CORE VALUES
      ====================================================== */}

      <section className="bg-slate-50 py-20 md:py-28">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="font-bold uppercase tracking-[0.18em] text-blue-600">
              Our Values
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
              What guides our work
            </h2>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

              <div className="text-4xl">
                💎
              </div>

              <h3 className="mt-6 text-2xl font-black text-slate-900">
                Quality
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                We focus on producing clean, professional,
                and carefully prepared printing materials.
              </p>

            </div>


            <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

              <div className="text-4xl">
                🤝
              </div>

              <h3 className="mt-6 text-2xl font-black text-slate-900">
                Reliability
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                We aim to provide dependable service and
                communicate clearly throughout each project.
              </p>

            </div>


            <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

              <div className="text-4xl">
                ❤️
              </div>

              <h3 className="mt-6 text-2xl font-black text-slate-900">
                Customer Focus
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                We listen to customer requirements and work
                toward solutions that fit their needs.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-blue-600 py-20 md:py-24">

        <div className="absolute inset-0">

          <div className="absolute left-[-10%] top-[-50%] h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl" />

          <div className="absolute bottom-[-50%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-300/10 blur-3xl" />

        </div>


        <div className="relative mx-auto max-w-4xl px-6 text-center">

          <p className="font-bold uppercase tracking-[0.2em] text-blue-100">
            Let&apos;s Work Together
          </p>

          <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">
            Have a printing project in mind?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Whether you need business printing, advertising
            materials, branding, or a custom project, GNF Printing
            is ready to help turn your idea into a finished product.
          </p>


          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

            <a
              href="/services"
              className="rounded-xl bg-white px-8 py-4 font-bold text-blue-600 shadow-xl transition hover:-translate-y-1 hover:bg-slate-50"
            >
              Explore Services →
            </a>

            <a
              href="/contact"
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
            >
              Contact GNF Printing
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}

