export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-slate-50">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute inset-0">

          <div className="absolute left-[-10%] top-[-30%] h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute bottom-[-30%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="hero-grid absolute inset-0 opacity-20" />

        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center md:py-32">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-xl shadow-blue-600/20">
            💬
          </div>

          <p className="mt-7 font-bold uppercase tracking-[0.2em] text-blue-400">
            GNF PRINTING
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            Let&apos;s Talk About
            <span className="hero-gradient-text block">
              Your Project
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400 md:text-xl">
            Have a question, need a quotation, or ready to start
            a printing project? Get in touch with our team.
          </p>

        </div>
      </section>


      {/* =====================================================
          CONTACT CARDS
      ====================================================== */}

      <section className="relative -mt-10 z-10">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid gap-5 md:grid-cols-3">

            {/* Phone */}

            <a
              href="tel:+251900000000"
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-xl transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl transition group-hover:scale-110">
                📞
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-400">
                Call Us
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-900">
                +251 900 000 000
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Call us to discuss your project.
              </p>

            </a>


            {/* Email */}

            <a
              href="mailto:info@gnfprinting.com"
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-2xl"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-2xl transition group-hover:scale-110">
                ✉️
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-400">
                Email Us
              </p>

              <h2 className="mt-2 break-all text-xl font-black text-slate-900">
                info@gnfprinting.com
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Send us your questions or requirements.
              </p>

            </a>


            {/* Location */}

            <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-xl transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-2xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl transition group-hover:scale-110">
                📍
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-400">
                Visit Us
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-900">
                Addis Ababa
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Visit our printing center and discuss your project.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT CONTENT
      ====================================================== */}

      <section className="py-20 md:py-28">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">

            {/* LEFT SIDE */}

            <div>

              <p className="font-bold uppercase tracking-[0.18em] text-blue-600">
                Get In Touch
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900 md:text-5xl">
                Tell us what
                <span className="block text-blue-600">
                  you need.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-500">
                Whether you need business cards, banners,
                stickers, signs, digital printing, or a
                customized project, send us your requirements
                and we&apos;ll help you find the right solution.
              </p>


              {/* Contact details */}

              <div className="mt-10 space-y-5">

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                    📞
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-400">
                      Phone
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      +251 900 000 000
                    </p>
                  </div>

                </div>


                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100">
                    ✉️
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      info@gnfprinting.com
                    </p>
                  </div>

                </div>


                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                    📍
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      Addis Ababa, Ethiopia
                    </p>
                  </div>

                </div>

              </div>


              {/* Working hours */}

              <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                    🕐
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900">
                      Business Hours
                    </h3>

                    <p className="text-sm text-slate-500">
                      We&apos;re ready to help.
                    </p>
                  </div>

                </div>


                <div className="mt-5 space-y-3 text-sm">

                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-500">
                      Monday - Friday
                    </span>

                    <span className="font-bold text-slate-900">
                      8:00 AM - 6:00 PM
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Saturday
                    </span>

                    <span className="font-bold text-slate-900">
                      9:00 AM - 4:00 PM
                    </span>
                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT SIDE - FORM */}

            <div className="relative">

              <div className="absolute -inset-4 rounded-[2rem] bg-blue-100/50 blur-3xl" />

              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-7 shadow-2xl sm:p-10">

                <div className="mb-8">

                  <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                    Send A Message
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-slate-900">
                    How can we help?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Fill out the form and tell us about your
                    printing project.
                  </p>

                </div>


                <form className="space-y-5">

                  {/* Name */}

                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>


                  {/* Email */}

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>


                  {/* Phone */}

                  <div>

                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+251 ..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>


                  {/* Service */}

                  <div>

                    <label
                      htmlFor="service"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      What do you need?
                    </label>

                    <select
                      id="service"
                      name="service"
                      defaultValue=""
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    >

                      <option value="" disabled>
                        Select a service
                      </option>

                      <option value="digital-printing">
                        Digital Printing
                      </option>

                      <option value="banner">
                        Banner Printing
                      </option>

                      <option value="business-card">
                        Business Cards
                      </option>

                      <option value="sticker">
                        Stickers & Labels
                      </option>

                      <option value="sign">
                        Signs & Advertising
                      </option>

                      <option value="custom">
                        Custom Project
                      </option>

                    </select>

                  </div>


                  {/* Message */}

                  <div>

                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Project Details
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project, quantity, size, material, or any other requirements..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>


                  {/* Submit */}

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
                  >
                    Send Message

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    We&apos;ll get back to you as soon as possible.
                  </p>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAP / LOCATION
      ====================================================== */}

      <section className="bg-white pb-20 md:pb-28">

        <div className="mx-auto max-w-7xl px-6">

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-xl">

            <div className="grid lg:grid-cols-2">

              {/* Map placeholder */}

              <div className="relative min-h-[350px] overflow-hidden bg-slate-900">

                <div className="absolute inset-0 opacity-20">
                  <div className="hero-grid h-full w-full" />
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl shadow-2xl shadow-blue-600/30">
                    📍
                  </div>

                  <h3 className="mt-5 text-xl font-black text-white">
                    GNF Printing
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Addis Ababa, Ethiopia
                  </p>

                </div>

              </div>


              {/* Location text */}

              <div className="flex flex-col justify-center p-8 md:p-12">

                <p className="font-bold uppercase tracking-[0.18em] text-blue-400">
                  Find Us
                </p>

                <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
                  Come visit GNF Printing
                </h2>

                <p className="mt-5 leading-7 text-slate-400">
                  If you prefer to discuss your project in person,
                  visit our printing center. Our team can help you
                  understand available options and choose a suitable
                  solution.
                </p>

                <div className="mt-8">

                  <p className="text-sm font-bold text-slate-500">
                    LOCATION
                  </p>

                  <p className="mt-2 font-bold text-white">
                    Addis Ababa, Ethiopia
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-blue-600 py-16">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-3xl font-black text-white md:text-4xl">
            Ready to start your project?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Contact GNF Printing today and let&apos;s turn your
            idea into a professional printed product.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href="tel:+251900000000"
              className="rounded-xl bg-white px-7 py-3.5 font-bold text-blue-600 transition hover:-translate-y-1 hover:bg-slate-50"
            >
              📞 Call Us
            </a>

            <a
              href="mailto:info@gnfprinting.com"
              className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:-translate-y-1 hover:bg-white/20"
            >
              ✉️ Email Us
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}
