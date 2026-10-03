/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ChangeEvent,
  useState,
} from "react";

import { Price, PricingType } from "@/types/price";
import { units } from "@/data/units";

interface PriceFormProps {
  price?: Price | null;
  onSaved?: (savedPrice: Price) => void;
  onCancel?: () => void;
}

interface NewImage {
  id: string;
  name: string;
  dataUrl: string;
}

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export default function PriceForm({
  price,
  onSaved,
  onCancel,
}: PriceFormProps) {
  /*
   * Check whether a unit exists in the
   * predefined unit list.
   */
  function isPredefinedUnit(value: string) {
    return units.some(
      (item) => item.value === value
    );
  }

  /*
   * =========================
   * FORM STATE
   * =========================
   *
   * IMPORTANT:
   *
   * We initialize the state directly from
   * `price`.
   *
   * We do NOT use useEffect + setState here.
   *
   * PriceManagement gives this component
   * a changing `key`, so React creates a
   * fresh form when the selected service
   * changes.
   */

  const [service, setService] = useState(
    price?.service ?? ""
  );

  const [description, setDescription] =
    useState(
      price?.description ?? ""
    );

  const [pricingType, setPricingType] =
    useState<PricingType>(
      price?.pricingType ?? "fixed"
    );

  const [unitPrice, setUnitPrice] =
    useState<number | "">(
      price?.unitPrice ?? ""
    );

  /*
   * UNIT
   *
   * If the saved unit exists in our predefined
   * units, use it normally.
   *
   * If it does not exist, select "other".
   */
  const [unit, setUnit] = useState(() => {
    if (!price) {
      return "";
    }

    return isPredefinedUnit(price.unit)
      ? price.unit
      : "other";
  });

  /*
   * CUSTOM UNIT
   *
   * If the saved unit was a custom unit,
   * put it into the customUnit field.
   */
  const [customUnit, setCustomUnit] =
    useState(() => {
      if (!price) {
        return "";
      }

      return isPredefinedUnit(price.unit)
        ? ""
        : price.unit;
    });

  /*
   * EXISTING IMAGES
   */
  const [existingImages, setExistingImages] =
    useState<string[]>(
      Array.isArray(price?.images)
        ? price.images
        : []
    );

  /*
   * NEW IMAGES
   */
  const [newImages, setNewImages] =
    useState<NewImage[]>([]);

  /*
   * SAVING STATE
   */
  const [saving, setSaving] =
    useState(false);

  /*
   * MESSAGE
   */
  const [message, setMessage] =
    useState("");

  /*
   * =========================
   * RESET FORM
   * =========================
   */
  function resetForm() {
    setService("");
    setDescription("");
    setPricingType("fixed");
    setUnitPrice("");
    setUnit("");
    setCustomUnit("");
    setExistingImages([]);
    setNewImages([]);
    setMessage("");
  }

  /*
   * =========================
   * IMAGE UPLOAD
   * =========================
   */
  async function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) {
      return;
    }

    const totalImages =
      existingImages.length +
      newImages.length +
      files.length;

    /*
     * Maximum 20 images
     */
    if (totalImages > 20) {
      alert(
        "You can have a maximum of 20 images per service."
      );

      event.target.value = "";
      return;
    }

    /*
     * Allowed image types
     */
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    const converted: NewImage[] = [];

    for (const file of files) {
      /*
       * Check image type
       */
      if (!allowedTypes.includes(file.type)) {
        alert(
          `${file.name} is not a supported image.`
        );

        continue;
      }

      /*
       * Maximum 5MB
       */
      if (file.size > 5 * 1024 * 1024) {
        alert(
          `${file.name} is larger than 5MB.`
        );

        continue;
      }

      /*
       * Convert image to Base64
       */
      const dataUrl =
        await readFileAsDataUrl(file);

      converted.push({
        id: crypto.randomUUID(),
        name: file.name,
        dataUrl,
      });
    }

    setNewImages((current) => [
      ...current,
      ...converted,
    ]);

    /*
     * Allow selecting the same file again.
     */
    event.target.value = "";
  }

  /*
   * =========================
   * READ FILE
   * =========================
   */
  function readFileAsDataUrl(
    file: File
  ): Promise<string> {
    return new Promise(
      (resolve, reject) => {
        const reader =
          new FileReader();

        reader.onload = () =>
          resolve(
            String(reader.result)
          );

        reader.onerror = reject;

        reader.readAsDataURL(file);
      }
    );
  }

  /*
   * =========================
   * REMOVE EXISTING IMAGE
   * =========================
   */
  function removeExistingImage(
    image: string
  ) {
    setExistingImages((current) =>
      current.filter(
        (item) => item !== image
      )
    );
  }

  /*
   * =========================
   * REMOVE NEW IMAGE
   * =========================
   */
  function removeNewImage(id: string) {
    setNewImages((current) =>
      current.filter(
        (image) => image.id !== id
      )
    );
  }

  /*
   * =========================
   * SAVE SERVICE
   * =========================
   */
  async function savePrice() {
    /*
     * SERVICE VALIDATION
     */
    if (!service.trim()) {
      alert(
        "Please enter service name."
      );

      return;
    }

    /*
     * UNIT VALIDATION
     */
    if (!unit) {
      alert(
        "Please select a unit."
      );

      return;
    }

    /*
     * CUSTOM UNIT VALIDATION
     */
    if (
      unit === "other" &&
      !customUnit.trim()
    ) {
      alert(
        "Please enter your custom unit."
      );

      return;
    }

    /*
     * PRICE VALIDATION
     */
    if (
      unitPrice === "" ||
      Number(unitPrice) < 0
    ) {
      alert(
        "Please enter a valid price."
      );

      return;
    }

    /*
     * =========================
     * FINAL UNIT
     * =========================
     *
     * Example:
     *
     * unit = "m2"
     * finalUnit = "m2"
     *
     * unit = "other"
     * customUnit = "Dozen"
     * finalUnit = "Dozen"
     */
    const finalUnit =
      unit === "other"
        ? customUnit.trim()
        : unit;

    try {
      setSaving(true);
      setMessage("");

      /*
       * CREATE = POST
       * EDIT   = PUT
       */
      const response = await fetch(
        "/api/prices",
        {
          method: price
            ? "PUT"
            : "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            /*
             * Only send ID when editing.
             */
            ...(price
              ? {
                  id: price.id,
                }
              : {}),

            /*
             * Service information
             */
            service:
              service.trim(),

            description:
              description.trim(),

            /*
             * Pricing
             */
            pricingType,

            unitPrice:
              Number(unitPrice),

            unit: finalUnit,

            /*
             * Existing images that
             * were not deleted.
             */
            images:
              existingImages,

            /*
             * Newly uploaded images.
             */
            uploadedImages:
              newImages.map(
                (image) => ({
                  name:
                    image.name,

                  dataUrl:
                    image.dataUrl,
                })
              ),
          }),
        }
      );

      const data =
        await response.json();

      /*
       * API ERROR
       */
      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to save service."
        );
      }

      /*
       * SUCCESS MESSAGE
       */
      setMessage(
        price
          ? "Service updated successfully."
          : "Service created successfully."
      );

      /*
       * If creating a new service,
       * clear the form.
       *
       * If editing, don't reset manually.
       * PriceManagement will close the edit
       * form and create a fresh form.
       */
      if (!price) {
        resetForm();
      }

      setNewImages([]);

      /*
       * Tell PriceManagement to reload.
       */
      onSaved?.(data);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * =========================
   * TOTAL IMAGES
   * =========================
   */
  const totalImages =
    existingImages.length +
    newImages.length;

  /*
   * =========================
   * PRICE PREVIEW UNIT
   * =========================
   */
  const previewUnit =
    unit === "other"
      ? customUnit
      : unit;

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* =========================
          HEADER
      ========================== */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {price
            ? "Edit Service"
            : "Add New Service"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add service information, pricing,
          and multiple service images.
        </p>
      </div>

      {/* =========================
          BASIC INFORMATION
      ========================== */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* SERVICE NAME */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Service Name
          </label>

          <input
            type="text"
            value={service}
            onChange={(e) =>
              setService(e.target.value)
            }
            placeholder="Banner Printing"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* PRICING TYPE */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Pricing Type
          </label>

          <select
            value={pricingType}
            onChange={(e) =>
              setPricingType(
                e.target.value as PricingType
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="fixed">
              Fixed
            </option>

            <option value="quantity">
              Quantity
            </option>

            <option value="area">
              Area
            </option>

            <option value="volume">
              Volume
            </option>
          </select>
        </div>

        {/* PRICE */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Unit Price
          </label>

          <input
            type="number"
            min="0"
            value={unitPrice}
            onChange={(e) =>
              setUnitPrice(
                e.target.value === ""
                  ? ""
                  : Number(
                      e.target.value
                    )
              )
            }
            placeholder="350"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* UNIT */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Unit
          </label>

          <select
            value={unit}
            onChange={(e) => {
              const value =
                e.target.value;

              setUnit(value);

              /*
               * Clear custom unit when
               * switching away from Other.
               */
              if (value !== "other") {
                setCustomUnit("");
              }
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">
              Select unit...
            </option>

            {units.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>

          {/* CUSTOM UNIT */}
          {unit === "other" && (
            <div className="mt-3">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Custom Unit
              </label>

              <input
                type="text"
                value={customUnit}
                onChange={(e) =>
                  setCustomUnit(
                    e.target.value
                  )
                }
                placeholder="Enter custom unit, e.g. Dozen"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              <p className="mt-1 text-xs text-slate-500">
                Enter your own unit if it is
                not available in the list.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          DESCRIPTION
      ========================== */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          rows={4}
          placeholder="Describe this printing service..."
          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* =========================
          IMAGES
      ========================== */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-bold text-slate-900">
              Service Images
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Upload multiple images for this
              service.
            </p>
          </div>

          <label className="cursor-pointer rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700">
            + Upload Images

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={
                handleImageChange
              }
              className="hidden"
            />
          </label>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          {totalImages} / 20 images · Maximum
          5MB per image
        </div>

        {/* IMAGE GRID */}
        {totalImages > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {/* EXISTING IMAGES */}
            {existingImages.map(
              (image, index) => (
                <div
                  key={image}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <img
                    src={image}
                    alt={`Service image ${
                      index + 1
                    }`}
                    className="h-32 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeExistingImage(
                        image
                      )
                    }
                    className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white shadow hover:bg-red-700"
                  >
                    ×
                  </button>

                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                      Main
                    </span>
                  )}
                </div>
              )
            )}

            {/* NEW IMAGES */}
            {newImages.map(
              (image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl border-2 border-blue-400 bg-white"
                >
                  <img
                    src={image.dataUrl}
                    alt={image.name}
                    className="h-32 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeNewImage(
                        image.id
                      )
                    }
                    className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white shadow hover:bg-red-700"
                  >
                    ×
                  </button>

                  <span className="absolute bottom-2 left-2 max-w-[90%] truncate rounded-md bg-blue-600 px-2 py-1 text-xs text-white">
                    New
                  </span>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="text-4xl">
              🖼️
            </div>

            <p className="mt-3 font-semibold text-slate-700">
              No images added
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Upload one or multiple images.
            </p>
          </div>
        )}
      </div>

      {/* =========================
          PRICE PREVIEW
      ========================== */}
      {unitPrice !== "" && (
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-sm text-slate-500">
            Price Preview
          </div>

          <div className="mt-1 text-xl font-bold text-slate-900">
            {money(Number(unitPrice))} ETB

            {previewUnit &&
              ` / ${previewUnit}`}
          </div>
        </div>
      )}

      {/* =========================
          MESSAGE
      ========================== */}
      {message && (
        <div className="rounded-xl bg-blue-50 p-4 text-sm font-medium text-blue-700">
          {message}
        </div>
      )}

      {/* =========================
          BUTTONS
      ========================== */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={savePrice}
          disabled={saving}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : price
              ? "Save Changes"
              : "Save Service"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}