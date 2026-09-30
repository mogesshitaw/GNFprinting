import Link from "next/link";
import { Price } from "@/types/price";

interface HomeServicesProps {
  prices: Price[];
}

function getPriceText(price: Price) {
  if (price.pricingType === "fixed") {
    return `${price.unitPrice.toLocaleString()} ETB`;
  }

  if (price.pricingType === "area") {
    return `${price.unitPrice.toLocaleString()} ETB / m²`;
  }

  if (price.pricingType === "volume") {
    return `${price.unitPrice.toLocaleString()} ETB / m³`;
  }

  return `${price.unitPrice.toLocaleString()} ETB / ${price.unit}`;
}

function getPricingLabel(pricingType: Price["pricingType"]) {
  switch (pricingType) {
    case "fixed":
      return "Fixed Price";

    case "quantity":
      return "Quantity Based";

    case "area":
      return "Area Based";

    case "volume":
      return "Volume Based";

    default:
      return pricingType;
  }
}

function getServiceIcon(service: string) {
  const name = service.toLowerCase();

  if (name.includes("banner")) return "🖼️";
  if (name.includes("card")) return "💳";
  if (name.includes("acrylic")) return "✨";
  if (name.includes("logo")) return "🎨";
  if (name.includes("paper")) return "📄";
  if (name.includes("sticker")) return "🏷️";
  if (name.includes("sign")) return "🪧";

  return "🖨️";
}

export default function HomeServices({
  prices,
}: HomeServicesProps) {
  const featuredServices = prices.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">

      {/* Background */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">

            <p className="font-bold uppercase tracking-[0.18em] text-blue-600">
              What We Offer
            </p>

            <h2 className="mt-3 text-4xl font-black text-slate-900 md:text-5xl">
              Our Printing Services
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Professional printing and advertising solutions
              designed for businesses, organizations, and individuals.
            </p>

          </div>

          <Link
            href="/services"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 font-bold text-white transition hover:-translate-y-1 hover:bg-blue-600"
          >
            View All Services
            <span>→</span>
          </Link>

        </div>


        {/* Services */}
        {featuredServices.length === 0 ? (

          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="text-4xl">
              🖨️
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              No services available
            </h3>

            <p className="mt-2 text-slate-500">
              Our services will be available soon.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {featuredServices.map((price, index) => (

              <div
                key={price.id}
                className="service-card group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >

                {/* Number */}
                <div className="absolute right-5 top-5 text-5xl font-black text-slate-100 transition group-hover:text-blue-50">
                  {String(index + 1).padStart(2, "0")}
                </div>


                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition duration-300 group-hover:scale-110 group-hover:bg-blue-600">
                  <span className="transition group-hover:grayscale">
                    {getServiceIcon(price.service)}
                  </span>
                </div>


                {/* Content */}
                <div className="relative">

                  <span className="mt-6 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {getPricingLabel(price.pricingType)}
                  </span>

                  <h3 className="mt-4 text-xl font-black text-slate-900">
                    {price.service}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
                    {price.description ||
                      "Professional printing service from GNF Printing."}
                  </p>


                  {/* Price */}
                  <div className="mt-6 rounded-xl bg-slate-50 p-4 transition group-hover:bg-blue-50">

                    <p className="text-xs font-medium text-slate-500">
                      Starting Price
                    </p>

                    <p className="mt-1 text-xl font-black text-slate-900">
                      {getPriceText(price)}
                    </p>

                  </div>


                  {/* Button */}
                  <Link
                    href="/services"
                    className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    View Details

                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                </div>

              </div>

            ))}

          </div>
        )}


        {/* Bottom link */}
        {featuredServices.length > 0 && (
          <div className="mt-12 text-center">

            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-bold text-blue-600 transition hover:text-blue-700"
            >
              Explore all printing services
              <span>→</span>
            </Link>

          </div>
        )}

      </div>
    </section>
  );
}