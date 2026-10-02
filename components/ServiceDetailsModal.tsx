"use client";

import { useState } from "react";
import { Price } from "@/types/price";

interface ServiceDetailsModalProps {
  price: Price | null;
  open: boolean;
  onClose: () => void;
  onCalculate?: () => void;
}

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export default function ServiceDetailsModal({
  price,
  open,
  onClose,
  onCalculate,
}: ServiceDetailsModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!open || !price) {
    return null;
  }

  const images = Array.isArray(price.images)
    ? price.images
    : [];

  const getPricingLabel = () => {
    switch (price.pricingType) {
      case "fixed":
        return "Fixed Price";

      case "quantity":
        return "Price per Quantity";

      case "area":
        return "Price per Area";

      case "volume":
        return "Price per Volume";

      default:
        return "Pricing";
    }
  };

  const getPriceText = () => {
    if (price.pricingType === "fixed") {
      return `${money(price.unitPrice)} ETB`;
    }

    return `${money(price.unitPrice)} ETB / ${price.unit}`;
  };

  const nextImage = () => {
    if (images.length === 0) return;

    setSelectedImage((current) =>
      current === images.length - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    if (images.length === 0) return;

    setSelectedImage((current) =>
      current === 0
        ? images.length - 1
        : current - 1
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl font-bold text-white transition hover:bg-black/80"
          aria-label="Close"
        >
          ×
        </button>

        {/* IMAGE GALLERY */}
        {images.length > 0 ? (
          <div className="bg-slate-950">
            {/* MAIN IMAGE */}
            <div className="relative flex h-[320px] items-center justify-center sm:h-[450px]">
              <img
                src={images[selectedImage]}
                alt={`${price.service} image ${selectedImage + 1}`}
                className="h-full w-full object-contain"
              />

              {/* PREVIOUS */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={previousImage}
                  className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-slate-800 shadow-lg transition hover:bg-white"
                >
                  ‹
                </button>
              )}

              {/* NEXT */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-slate-800 shadow-lg transition hover:bg-white"
                >
                  ›
                </button>
              )}

              {/* IMAGE COUNTER */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white">
                {selectedImage + 1} / {images.length}
              </div>
            </div>

            {/* THUMBNAILS */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto p-4">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      selectedImage === index
                        ? "border-blue-500 ring-2 ring-blue-500/30"
                        : "border-white/20 hover:border-white/60"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${price.service} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* NO IMAGE */
          <div className="flex h-64 items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
            <div className="text-center">
              <div className="text-6xl">🖨️</div>

              <p className="mt-3 text-sm font-medium text-slate-500">
                No images available
              </p>
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="p-6 sm:p-8">
          {/* SERVICE HEADER */}
          <div className="pr-10">
            <div className="mb-3">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-700">
                {getPricingLabel()}
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {price.service}
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              {price.description ||
                "Professional printing service from GNF Printing."}
            </p>
          </div>

          {/* PRICE */}
          <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-500">
              Starting Price
            </p>

            <div className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">
                {getPriceText()}
              </span>
            </div>
          </div>

          {/* SERVICE INFORMATION */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Pricing Type
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {getPricingLabel()}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Unit
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {price.unit}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Unit Price
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {money(price.unitPrice)} ETB
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Available Images
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {images.length}{" "}
                {images.length === 1
                  ? "image"
                  : "images"}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {onCalculate && (
              <button
                type="button"
                onClick={onCalculate}
                className="flex-1 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Calculate Price
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}