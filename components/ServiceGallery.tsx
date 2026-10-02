/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

interface ServiceGalleryProps {
  images?: string[];
  serviceName: string;
}

export default function ServiceGallery({
  images = [],
  serviceName,
}: ServiceGalleryProps) {
  const [selectedImage, setSelectedImage] =
    useState(0);

  const validImages =
    images.length > 0
      ? images
      : ["/images/placeholder.jpg"];

  return (
    <div className="space-y-4">
      {/* MAIN IMAGE */}
      <div className="overflow-hidden rounded-2xl bg-slate-100">
        <img
          src={validImages[selectedImage]}
          alt={serviceName}
          className="h-72 w-full object-cover transition duration-300"
        />
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map(
            (image, index) => (
              <button
                key={image}
                type="button"
                onClick={() =>
                  setSelectedImage(index)
                }
                className={`overflow-hidden rounded-xl border-2 transition ${
                  selectedImage === index
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${serviceName} ${
                    index + 1
                  }`}
                  className="h-20 w-full object-cover"
                />
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}