"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Price } from "@/types/price";
import {
  Quotation,
  QuotationItem,
} from "@/types/quotation";

interface EditQuotationFormProps {
  quotation: Quotation;
  prices: Price[];
}

export default function EditQuotationForm({
  quotation,
  prices,
}: EditQuotationFormProps) {
  // =========================================================
  // CUSTOMER
  // =========================================================

  const [customerName, setCustomerName] =
    useState(quotation.customerName);

  const [contactPerson, setContactPerson] =
    useState(quotation.contactPerson);

  const [phone, setPhone] =
    useState(quotation.phone);

  const [email, setEmail] =
    useState(quotation.email);

  const [projectTitle, setProjectTitle] =
    useState(quotation.projectTitle);

  // =========================================================
  // DETAILS
  // =========================================================

  const [issueDate, setIssueDate] =
    useState(quotation.issueDate);

  const [validUntil, setValidUntil] =
    useState(quotation.validUntil);

  const [deliveryTime, setDeliveryTime] =
    useState(quotation.deliveryTime);

  const [paymentTerms, setPaymentTerms] =
    useState(quotation.paymentTerms);

  const [notes, setNotes] =
    useState(quotation.notes);

  // =========================================================
  // ITEMS
  // =========================================================

  const [items, setItems] =
    useState<QuotationItem[]>(
      quotation.items
    );

  // =========================================================
  // SERVICE BUILDER
  // =========================================================

  const [selectedPriceId, setSelectedPriceId] =
    useState<number | "">("");

  const [useCalculation, setUseCalculation] =
    useState(false);

  const [quantity, setQuantity] =
    useState(1);

  const [width, setWidth] =
    useState<number | "">("");

  const [height, setHeight] =
    useState<number | "">("");

  const [depth, setDepth] =
    useState<number | "">("");

  const [specialPrice, setSpecialPrice] =
    useState<number | "">("");

  const [editingItemId, setEditingItemId] =
    useState<string | null>(null);

  // =========================================================
  // FINANCIAL
  // =========================================================

  const [discount, setDiscount] =
    useState(quotation.discount);

  const [tax, setTax] =
    useState(quotation.tax);

  // =========================================================
  // SAVE STATE
  // =========================================================

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // =========================================================
  // SELECTED PRICE
  // =========================================================

  const selectedService = useMemo(() => {
    return prices.find(
      (price) =>
        price.id === selectedPriceId
    );
  }, [
    prices,
    selectedPriceId,
  ]);

  const actualUnitPrice =
    specialPrice !== ""
      ? Number(specialPrice)
      : selectedService?.unitPrice || 0;

  // =========================================================
  // CALCULATE
  // =========================================================

  function calculateItemTotal() {
    if (!selectedService) {
      return 0;
    }

    const price = actualUnitPrice;

    if (!useCalculation) {
      return price;
    }

    switch (
      selectedService.pricingType
    ) {
      case "fixed":
        return price;

      case "quantity":
        return (
          Number(quantity || 1) *
          price
        );

      case "area":
        return (
          Number(width || 0) *
          Number(height || 0) *
          price
        );

      case "volume":
        return (
          Number(width || 0) *
          Number(height || 0) *
          Number(depth || 0) *
          price
        );

      default:
        return price;
    }
  }

  const currentItemTotal =
    calculateItemTotal();

  // =========================================================
  // RESET SERVICE
  // =========================================================

  function resetServiceBuilder() {
    setSelectedPriceId("");
    setUseCalculation(false);
    setQuantity(1);
    setWidth("");
    setHeight("");
    setDepth("");
    setSpecialPrice("");
    setEditingItemId(null);
  }

  // =========================================================
  // ADD / UPDATE ITEM
  // =========================================================

  function saveServiceItem() {
    if (!selectedService) {
      alert("Please select a service.");
      return;
    }

    if (actualUnitPrice <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (
      useCalculation &&
      selectedService.pricingType ===
        "quantity" &&
      Number(quantity) <= 0
    ) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (
      useCalculation &&
      selectedService.pricingType ===
        "area" &&
      (Number(width) <= 0 ||
        Number(height) <= 0)
    ) {
      alert(
        "Please enter valid width and height."
      );
      return;
    }

    if (
      useCalculation &&
      selectedService.pricingType ===
        "volume" &&
      (Number(width) <= 0 ||
        Number(height) <= 0 ||
        Number(depth) <= 0)
    ) {
      alert(
        "Please enter valid dimensions."
      );
      return;
    }

    const total =
      calculateItemTotal();

    const item: QuotationItem = {
      id:
        editingItemId ||
        crypto.randomUUID(),

      serviceId:
        selectedService.id,

      service:
        selectedService.service,

      description:
        selectedService.description,

      pricingType:
        selectedService.pricingType,

      quantity:
        useCalculation &&
        selectedService.pricingType ===
          "quantity"
          ? Number(quantity)
          : 1,

      width:
        useCalculation &&
        width !== ""
          ? Number(width)
          : undefined,

      height:
        useCalculation &&
        height !== ""
          ? Number(height)
          : undefined,

      depth:
        useCalculation &&
        depth !== ""
          ? Number(depth)
          : undefined,

      unit:
        selectedService.unit,

      unitPrice:
        actualUnitPrice,

      total,
    };

    if (editingItemId) {
      setItems((current) =>
        current.map((existing) =>
          existing.id ===
          editingItemId
            ? item
            : existing
        )
      );
    } else {
      setItems((current) => [
        ...current,
        item,
      ]);
    }

    resetServiceBuilder();
  }

  // =========================================================
  // EDIT ITEM
  // =========================================================

  function editItem(
    item: QuotationItem
  ) {
    setEditingItemId(item.id);

    setSelectedPriceId(
      item.serviceId
    );

    const calculated =
      item.width !== undefined ||
      item.height !== undefined ||
      item.depth !== undefined ||
      item.quantity > 1;

    setUseCalculation(
      calculated
    );

    setQuantity(
      item.quantity || 1
    );

    setWidth(
      item.width ?? ""
    );

    setHeight(
      item.height ?? ""
    );

    setDepth(
      item.depth ?? ""
    );

    setSpecialPrice(
      item.unitPrice
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================================================
  // REMOVE
  // =========================================================

  function removeItem(
    id: string
  ) {
    if (
      !window.confirm(
        "Remove this service?"
      )
    ) {
      return;
    }

    setItems((current) =>
      current.filter(
        (item) =>
          item.id !== id
      )
    );
  }

  // =========================================================
  // DUPLICATE
  // =========================================================

  function duplicateItem(
    item: QuotationItem
  ) {
    setItems((current) => [
      ...current,
      {
        ...item,
        id: crypto.randomUUID(),
      },
    ]);
  }

  // =========================================================
  // TOTALS
  // =========================================================

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + item.total,
      0
    );
  }, [items]);

  const grandTotal = Math.max(
    0,
    subtotal -
      Number(discount || 0) +
      Number(tax || 0)
  );

  // =========================================================
  // MONEY
  // =========================================================

  function money(value: number) {
    return new Intl.NumberFormat(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    ).format(value);
  }

  // =========================================================
  // DETAILS
  // =========================================================

  function details(
    item: QuotationItem
  ) {
    if (
      item.width !== undefined &&
      item.height !== undefined
    ) {
      if (
        item.depth !== undefined
      ) {
        return `${item.width} × ${item.height} × ${item.depth}`;
      }

      return `${item.width} × ${item.height}`;
    }

    if (item.quantity > 1) {
      return `${item.quantity} ${item.unit}`;
    }

    return `1 ${item.unit}`;
  }

  // =========================================================
  // SAVE CHANGES
  // =========================================================

  async function saveChanges() {
    if (!customerName.trim()) {
      alert(
        "Please enter customer name."
      );
      return;
    }

    if (items.length === 0) {
      alert(
        "Quotation must contain at least one service."
      );
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response =
        await fetch(
          "/api/quotations",
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              id: quotation.id,

              customerName,
              contactPerson,
              phone,
              email,
              projectTitle,

              issueDate,
              validUntil,

              deliveryTime,
              paymentTerms,
              notes,

              items,

              subtotal,

              discount:
                Number(discount || 0),

              tax:
                Number(tax || 0),

              grandTotal,

              status:
                quotation.status,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to update quotation."
        );
      }

      setMessage(
        "Quotation updated successfully."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to update quotation."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // SAVE AS NEW
  // =========================================================

  async function saveAsNew() {
    if (!customerName.trim()) {
      alert(
        "Please enter customer name."
      );
      return;
    }

    if (items.length === 0) {
      alert(
        "Quotation must contain at least one service."
      );
      return;
    }

    const confirmed =
      window.confirm(
        "Create a new quotation from this quotation? The original quotation will remain unchanged."
      );

    if (!confirmed) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response =
        await fetch(
          "/api/quotations",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              customerName,
              contactPerson,
              phone,
              email,
              projectTitle,

              issueDate,
              validUntil,

              deliveryTime,
              paymentTerms,
              notes,

              items,

              subtotal,

              discount:
                Number(discount || 0),

              tax:
                Number(tax || 0),

              grandTotal,

              status:
                "draft",
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to create quotation."
        );
      }

      setMessage(
        `New quotation ${data.quotationNumber} created successfully.`
      );

      if (data.id) {
        window.location.href =
          `/admin/quotations/${data.id}`;
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to create quotation."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="space-y-8">
      {/* CUSTOMER */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-xl font-black text-slate-900">
            Customer Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Edit customer and project information.
          </p>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <Input
            label="Customer / Organization"
            value={customerName}
            onChange={setCustomerName}
            required
          />

          <Input
            label="Contact Person"
            value={contactPerson}
            onChange={setContactPerson}
          />

          <Input
            label="Phone"
            value={phone}
            onChange={setPhone}
          />

          <Input
            label="Email"
            value={email}
            onChange={setEmail}
          />

          <Input
            label="Project Title"
            value={projectTitle}
            onChange={setProjectTitle}
          />

          <Input
            label="Issue Date"
            type="date"
            value={issueDate}
            onChange={setIssueDate}
          />

          <Input
            label="Valid Until"
            type="date"
            value={validUntil}
            onChange={setValidUntil}
          />

          <Input
            label="Delivery Time"
            value={deliveryTime}
            onChange={setDeliveryTime}
          />

          <Input
            label="Payment Terms"
            value={paymentTerms}
            onChange={setPaymentTerms}
          />
        </div>
      </section>

      {/* SERVICE BUILDER */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Add / Edit Services
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add another service or modify an existing service.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              {items.length} Services
            </span>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* SELECT */}

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Select Service
            </label>

            <select
              value={selectedPriceId}
              onChange={(event) => {
                const value =
                  event.target.value;

                setSelectedPriceId(
                  value === ""
                    ? ""
                    : Number(value)
                );

                setSpecialPrice("");
                setQuantity(1);
                setWidth("");
                setHeight("");
                setDepth("");
                setUseCalculation(false);
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="">
                -- Select from Price List --
              </option>

              {prices.map(
                (price) => (
                  <option
                    key={price.id}
                    value={price.id}
                  >
                    {price.service} —{" "}
                    {money(
                      price.unitPrice
                    )}{" "}
                    ETB /{" "}
                    {price.unit}
                  </option>
                )
              )}
            </select>
          </div>

          {selectedService && (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                    Price List Service
                  </p>

                  <h3 className="mt-1 text-lg font-black text-slate-900">
                    {selectedService.service}
                  </h3>
                </div>

                <div className="flex gap-3">
                  <div className="rounded-xl bg-white px-4 py-3">
                    <p className="text-xs text-slate-400">
                      Price
                    </p>

                    <p className="font-black">
                      {money(
                        selectedService.unitPrice
                      )}{" "}
                      ETB
                    </p>
                  </div>

                  <div className="rounded-xl bg-white px-4 py-3">
                    <p className="text-xs text-slate-400">
                      Unit
                    </p>

                    <p className="font-black">
                      {selectedService.unit}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <InputNumber
                  label="Customer Price (Optional)"
                  value={specialPrice}
                  onChange={
                    setSpecialPrice
                  }
                />

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Unit
                  </label>

                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold">
                    {selectedService.unit}
                  </div>
                </div>
              </div>

              {selectedService.pricingType !==
                "fixed" && (
                <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <label className="flex cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      checked={
                        useCalculation
                      }
                      onChange={(event) =>
                        setUseCalculation(
                          event.target
                            .checked
                        )
                      }
                      className="mt-1 h-5 w-5"
                    />

                    <div>
                      <p className="font-bold text-blue-900">
                        Use quantity / dimensions
                      </p>

                      <p className="text-sm text-blue-700">
                        Optional. Leave disabled to use the price
                        list price directly.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {useCalculation && (
                <div className="mt-5 grid gap-5 rounded-xl border border-slate-200 bg-white p-5 md:grid-cols-3">
                  {selectedService.pricingType ===
                    "quantity" && (
                    <InputNumber
                      label="Quantity"
                      value={
                        quantity
                      }
                      onChange={(value) =>
                        setQuantity(
                          value === ""
                            ? 1
                            : value
                        )
                      }
                    />
                  )}

                  {(selectedService.pricingType ===
                    "area" ||
                    selectedService.pricingType ===
                      "volume") && (
                    <>
                      <InputNumber
                        label="Width"
                        value={width}
                        onChange={
                          setWidth
                        }
                      />

                      <InputNumber
                        label="Height"
                        value={height}
                        onChange={
                          setHeight
                        }
                      />
                    </>
                  )}

                  {selectedService.pricingType ===
                    "volume" && (
                    <InputNumber
                      label="Depth"
                      value={depth}
                      onChange={
                        setDepth
                      }
                    />
                  )}
                </div>
              )}

              <div className="mt-5 flex flex-col gap-4 rounded-xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Service Total
                  </p>

                  <p className="text-2xl font-black text-slate-900">
                    {money(
                      currentItemTotal
                    )}{" "}
                    ETB
                  </p>
                </div>

                <div className="flex gap-3">
                  {editingItemId && (
                    <button
                      type="button"
                      onClick={
                        resetServiceBuilder
                      }
                      className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={
                      saveServiceItem
                    }
                    className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
                  >
                    {editingItemId
                      ? "Update Service"
                      : "+ Add Service"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ITEMS */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-xl font-black text-slate-900">
            Quotation Services
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-bold uppercase text-slate-500">
                <th className="px-5 py-4">
                  #
                </th>

                <th className="px-5 py-4">
                  Service
                </th>

                <th className="px-5 py-4">
                  Details
                </th>

                <th className="px-5 py-4">
                  Unit Price
                </th>

                <th className="px-5 py-4">
                  Total
                </th>

                <th className="px-5 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map(
                (item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-5 py-5 font-bold text-slate-400">
                      {index + 1}
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-bold">
                        {item.service}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.description}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-sm">
                      {details(item)}
                    </td>

                    <td className="px-5 py-5 font-semibold">
                      {money(
                        item.unitPrice
                      )}{" "}
                      ETB / {item.unit}
                    </td>

                    <td className="px-5 py-5 font-black">
                      {money(
                        item.total
                      )}{" "}
                      ETB
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            editItem(
                              item
                            )
                          }
                          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            duplicateItem(
                              item
                            )
                          }
                          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold hover:bg-slate-50"
                        >
                          Duplicate
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(
                              item.id
                            )
                          }
                          className="rounded-lg border border-red-100 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* NOTES + TOTAL */}

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-black">
            Notes
          </h2>

          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(
                event.target.value
              )
            }
            rows={8}
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            placeholder="Additional quotation notes..."
          />
        </div>

        <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl">
          <h2 className="mb-6 text-xl font-black">
            Quotation Summary
          </h2>

          <div className="space-y-5">
            <SummaryRow
              label="Subtotal"
              value={`${money(
                subtotal
              )} ETB`}
            />

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-300">
                Discount
              </span>

              <input
                type="number"
                min="0"
                value={discount}
                onChange={(event) =>
                  setDiscount(
                    Number(
                      event.target.value
                    )
                  )
                }
                className="w-32 rounded-lg bg-white/10 px-3 py-2 text-right text-white outline-none"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-300">
                Tax
              </span>

              <input
                type="number"
                min="0"
                value={tax}
                onChange={(event) =>
                  setTax(
                    Number(
                      event.target.value
                    )
                  )
                }
                className="w-32 rounded-lg bg-white/10 px-3 py-2 text-right text-white outline-none"
              />
            </div>

            <div className="border-t border-white/10 pt-5">
              <div className="flex items-end justify-between">
                <span className="text-slate-300">
                  Grand Total
                </span>

                <span className="text-3xl font-black">
                  {money(
                    grandTotal
                  )}{" "}
                  ETB
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIONS */}

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:justify-end">
        <Link
          href={`/admin/quotations/${quotation.id}`}
          className="rounded-xl border border-slate-300 px-6 py-3 text-center font-bold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>

        <button
          type="button"
          onClick={saveAsNew}
          disabled={saving}
          className="rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 font-bold text-blue-700 hover:bg-blue-100 disabled:opacity-50"
        >
          Save as New Quotation
        </button>

        <button
          type="button"
          onClick={saveChanges}
          disabled={saving}
          className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>

      {message && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center text-sm font-semibold text-green-700">
          {message}
        </div>
      )}
    </div>
  );
}

// ===========================================================
// INPUT
// ===========================================================

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
}

// ===========================================================
// NUMBER INPUT
// ===========================================================

function InputNumber({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | "";
  onChange: (
    value: number | ""
  ) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value === ""
              ? ""
              : Number(
                  event.target.value
                )
          )
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
}

// ===========================================================
// SUMMARY ROW
// ===========================================================

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-300">
        {label}
      </span>

      <span className="font-bold">
        {value}
      </span>
    </div>
  );
}