"use client";

import { useMemo, useState } from "react";
import { Price } from "@/types/price";
import { QuotationItem } from "@/types/quotation";

interface QuotationFormProps {
  prices: Price[];
  onSaved?: () => void;
}

export default function QuotationForm({
  prices,
  onSaved,
}: QuotationFormProps) {
  // =========================================================
  // CUSTOMER INFORMATION
  // =========================================================

  const [customerName, setCustomerName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectTitle, setProjectTitle] = useState("");

  // =========================================================
  // QUOTATION INFORMATION
  // =========================================================

  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [validUntil, setValidUntil] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentTerms, setPaymentTerms] = useState(
    "50% advance, 50% on completion"
  );
  const [notes, setNotes] = useState("");

  // =========================================================
  // SERVICE BUILDER
  // =========================================================

  const [selectedPriceId, setSelectedPriceId] = useState<number | "">("");

  // Optional calculation
  const [useCalculation, setUseCalculation] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [depth, setDepth] = useState<number | "">("");

  // Optional customer-specific price
  const [specialPrice, setSpecialPrice] = useState<number | "">("");

  // =========================================================
  // QUOTATION ITEMS
  // =========================================================

  const [items, setItems] = useState<QuotationItem[]>([]);

  // =========================================================
  // EDIT MODE
  // =========================================================

  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // =========================================================
  // DISCOUNT / TAX
  // =========================================================

  const [discount, setDiscount] = useState<number | "">("");
  const [tax, setTax] = useState<number | "">("");

  // =========================================================
  // SAVING
  // =========================================================

  const [saving, setSaving] = useState(false);

  // =========================================================
  // SELECTED SERVICE
  // =========================================================

  const selectedService = useMemo(() => {
    return prices.find(
      (price) => price.id === selectedPriceId
    );
  }, [prices, selectedPriceId]);

  // =========================================================
  // PRICE FROM PRICE LIST
  // =========================================================

  const defaultPrice = selectedService?.unitPrice || 0;

  // Special price overrides the price-list price.
  // Otherwise, the price-list price is used.
  const actualUnitPrice =
    specialPrice !== ""
      ? Number(specialPrice)
      : defaultPrice;

  // =========================================================
  // OPTIONAL CALCULATION
  // =========================================================

  function calculateItemTotal() {
    if (!selectedService) {
      return 0;
    }

    const price = actualUnitPrice;

    // ---------------------------------------------------------
    // IMPORTANT:
    // If calculation is OFF, use the price-list/special price
    // directly. No quantity or dimensions are required.
    // ---------------------------------------------------------

    if (!useCalculation) {
      return price;
    }

    // ---------------------------------------------------------
    // If calculation is ON, calculate according to the
    // pricing type.
    // ---------------------------------------------------------

    switch (selectedService.pricingType) {
      case "fixed":
        return price;

      case "quantity":
        return Number(quantity || 1) * price;

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

  const currentItemTotal = calculateItemTotal();

  // =========================================================
  // RESET SERVICE FORM
  // =========================================================

  function resetServiceFields() {
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
  // VALIDATE SERVICE
  // =========================================================

  function validateService(): boolean {
    if (!selectedService) {
      alert("Please select a service.");
      return false;
    }

    if (actualUnitPrice <= 0) {
      alert("Please enter a valid price.");
      return false;
    }

    // If calculation is disabled,
    // no quantity or dimensions are required.
    if (!useCalculation) {
      return true;
    }

    switch (selectedService.pricingType) {
      case "fixed":
        return true;

      case "quantity":
        if (Number(quantity) <= 0) {
          alert("Please enter a valid quantity.");
          return false;
        }

        return true;

      case "area":
        if (
          Number(width) <= 0 ||
          Number(height) <= 0
        ) {
          alert(
            "Please enter valid width and height."
          );
          return false;
        }

        return true;

      case "volume":
        if (
          Number(width) <= 0 ||
          Number(height) <= 0 ||
          Number(depth) <= 0
        ) {
          alert(
            "Please enter valid width, height and depth."
          );
          return false;
        }

        return true;

      default:
        return true;
    }
  }

  // =========================================================
  // ADD / UPDATE SERVICE
  // =========================================================

  function saveServiceItem() {
    if (!validateService()) {
      return;
    }

    const total = calculateItemTotal();

    if (total <= 0) {
      alert("The service total must be greater than zero.");
      return;
    }

    const item: QuotationItem = {
      id: editingItemId || crypto.randomUUID(),

      serviceId: selectedService!.id,

      service: selectedService!.service,

      description: selectedService!.description,

      pricingType: selectedService!.pricingType,

      // If calculation is OFF, quantity is 1.
      // If calculation is ON, use the entered quantity.
      quantity:
        useCalculation &&
        selectedService!.pricingType === "quantity"
          ? Number(quantity)
          : 1,

      width:
        useCalculation && width !== ""
          ? Number(width)
          : undefined,

      height:
        useCalculation && height !== ""
          ? Number(height)
          : undefined,

      depth:
        useCalculation && depth !== ""
          ? Number(depth)
          : undefined,

      // Always preserve the unit from the price list.
      unit: selectedService!.unit,

      // Preserve the actual price used for this quotation.
      unitPrice: actualUnitPrice,

      total,
    };

    if (editingItemId) {
      setItems((current) =>
        current.map((existingItem) =>
          existingItem.id === editingItemId
            ? item
            : existingItem
        )
      );
    } else {
      setItems((current) => [
        ...current,
        item,
      ]);
    }

    resetServiceFields();
  }

  // =========================================================
  // EDIT ITEM
  // =========================================================

  function editItem(item: QuotationItem) {
    setEditingItemId(item.id);

    setSelectedPriceId(item.serviceId);

    /*
     * If dimensions or quantity were stored,
     * this item was calculated.
     *
     * Otherwise it was simply added using
     * the price-list price.
     */
    const hasCalculation =
      item.quantity > 1 ||
      item.width !== undefined ||
      item.height !== undefined ||
      item.depth !== undefined;

    setUseCalculation(hasCalculation);

    setQuantity(
      item.quantity || 1
    );

    setWidth(
      item.width !== undefined
        ? item.width
        : ""
    );

    setHeight(
      item.height !== undefined
        ? item.height
        : ""
    );

    setDepth(
      item.depth !== undefined
        ? item.depth
        : ""
    );

    setSpecialPrice(item.unitPrice);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================================================
  // DUPLICATE ITEM
  // =========================================================

  function duplicateItem(item: QuotationItem) {
    const duplicatedItem: QuotationItem = {
      ...item,
      id: crypto.randomUUID(),
    };

    setItems((current) => [
      ...current,
      duplicatedItem,
    ]);
  }

  // =========================================================
  // REMOVE ITEM
  // =========================================================

  function removeItem(id: string) {
    const confirmed = window.confirm(
      "Remove this service from the quotation?"
    );

    if (!confirmed) {
      return;
    }

    setItems((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

    if (editingItemId === id) {
      resetServiceFields();
    }
  }

  // =========================================================
  // TOTALS
  // =========================================================

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.total,
      0
    );
  }, [items]);

  const discountAmount = Number(discount || 0);
  const taxAmount = Number(tax || 0);

  const grandTotal = Math.max(
    0,
    subtotal -
      discountAmount +
      taxAmount
  );

  // =========================================================
  // FORMAT MONEY
  // =========================================================

  function formatMoney(value: number) {
    return new Intl.NumberFormat(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    ).format(value);
  }

  // =========================================================
  // ITEM DETAILS
  // =========================================================

  function getItemDetails(
    item: QuotationItem
  ) {
    const hasDimensions =
      item.width !== undefined ||
      item.height !== undefined ||
      item.depth !== undefined;

    if (hasDimensions) {
      if (item.depth !== undefined) {
        return `${item.width} × ${item.height} × ${item.depth}`;
      }

      return `${item.width} × ${item.height}`;
    }

    if (item.quantity > 1) {
      return `${item.quantity} ${item.unit}`;
    }

    return `Price list — 1 ${item.unit}`;
  }

  // =========================================================
  // RESET WHOLE QUOTATION
  // =========================================================

  function resetQuotationForm() {
    setCustomerName("");
    setContactPerson("");
    setPhone("");
    setEmail("");
    setProjectTitle("");

    setIssueDate(
      new Date().toISOString().split("T")[0]
    );

    setValidUntil("");
    setDeliveryTime("");

    setPaymentTerms(
      "50% advance, 50% on completion"
    );

    setNotes("");

    setItems([]);

    setDiscount("");
    setTax("");

    resetServiceFields();
  }

  // =========================================================
  // SAVE QUOTATION
  // =========================================================

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!customerName.trim()) {
      alert("Please enter customer name.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter customer phone number.");
      return;
    }

    if (!projectTitle.trim()) {
      alert("Please enter project title.");
      return;
    }

    if (items.length === 0) {
      alert(
        "Please add at least one service."
      );
      return;
    }

    if (discountAmount < 0) {
      alert("Discount cannot be negative.");
      return;
    }

    if (taxAmount < 0) {
      alert("Tax cannot be negative.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "/api/quotations",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
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
            discount: discountAmount,
            tax: taxAmount,
            grandTotal,

            status: "draft",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to save quotation."
        );
      }

      alert(
        "Quotation saved successfully."
      );

      resetQuotationForm();

      onSaved?.();
    } catch (error) {
      console.error(
        "Quotation save error:",
        error
      );

      alert(
        "Failed to save quotation. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* =====================================================
          CUSTOMER INFORMATION
      ====================================================== */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              👤
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Customer Information
              </h2>

              <p className="text-sm text-gray-500">
                Enter customer and project information.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Customer Name *
            </label>

            <input
              type="text"
              value={customerName}
              onChange={(event) =>
                setCustomerName(event.target.value)
              }
              placeholder="e.g. ABC Company"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Contact Person
            </label>

            <input
              type="text"
              value={contactPerson}
              onChange={(event) =>
                setContactPerson(event.target.value)
              }
              placeholder="Contact person"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Phone *
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="09XXXXXXXX"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="customer@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Project Title *
            </label>

            <input
              type="text"
              value={projectTitle}
              onChange={(event) =>
                setProjectTitle(event.target.value)
              }
              placeholder="e.g. Office Branding Project"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          QUOTATION DETAILS
      ====================================================== */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              📅
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Quotation Details
              </h2>

              <p className="text-sm text-gray-500">
                Set quotation dates and terms.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Issue Date
            </label>

            <input
              type="date"
              value={issueDate}
              onChange={(event) =>
                setIssueDate(event.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Valid Until
            </label>

            <input
              type="date"
              value={validUntil}
              onChange={(event) =>
                setValidUntil(event.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Delivery Time
            </label>

            <input
              type="text"
              value={deliveryTime}
              onChange={(event) =>
                setDeliveryTime(event.target.value)
              }
              placeholder="e.g. 3–5 working days"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Payment Terms
            </label>

            <input
              type="text"
              value={paymentTerms}
              onChange={(event) =>
                setPaymentTerms(event.target.value)
              }
              placeholder="Payment terms"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE BUILDER
      ====================================================== */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                🛠️
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Add Services
                </h2>

                <p className="text-sm text-gray-500">
                  Add multiple services to one quotation.
                </p>
              </div>
            </div>

            <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              {items.length}{" "}
              {items.length === 1
                ? "Service"
                : "Services"}{" "}
              Added
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* =================================================
              SELECT SERVICE
          ================================================== */}

          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Select Service *
              </label>

              <select
                value={selectedPriceId}
                onChange={(event) =>
                  setSelectedPriceId(
                    event.target.value === ""
                      ? ""
                      : Number(event.target.value)
                  )
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  -- Select from Price List --
                </option>

                {prices.map((price) => (
                  <option
                    key={price.id}
                    value={price.id}
                  >
                    {price.service} —{" "}
                    {formatMoney(price.unitPrice)} ETB /{" "}
                    {price.unit}
                  </option>
                ))}
              </select>
            </div>

            {/* PRICE LIST INFORMATION */}

            {selectedService && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wide text-green-700">
                    Price List
                  </span>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600">
                    {selectedService.pricingType}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900">
                  {selectedService.service}
                </h3>

                <div className="mt-3 flex flex-wrap gap-3">
                  <div className="rounded-lg bg-white px-4 py-2">
                    <p className="text-xs text-gray-400">
                      Price
                    </p>

                    <p className="font-bold text-gray-900">
                      {formatMoney(
                        selectedService.unitPrice
                      )}{" "}
                      ETB
                    </p>
                  </div>

                  <div className="rounded-lg bg-white px-4 py-2">
                    <p className="text-xs text-gray-400">
                      Unit
                    </p>

                    <p className="font-bold text-gray-900">
                      {selectedService.unit}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =================================================
              PRICE / OPTIONAL CALCULATION
          ================================================== */}

          {selectedService && (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              {/* PRICE */}

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Price
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={specialPrice}
                      onChange={(event) =>
                        setSpecialPrice(
                          event.target.value === ""
                            ? ""
                            : Number(event.target.value)
                        )
                      }
                      placeholder={String(
                        selectedService.unitPrice
                      )}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-16 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                      ETB
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    Default:{" "}
                    {formatMoney(
                      selectedService.unitPrice
                    )}{" "}
                    ETB / {selectedService.unit}
                  </p>
                </div>

                {/* CURRENT UNIT */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Unit
                  </label>

                  <div className="flex h-[50px] items-center rounded-xl border border-gray-200 bg-white px-4">
                    <span className="font-bold text-gray-900">
                      {selectedService.unit}
                    </span>

                    <span className="ml-2 text-sm text-gray-400">
                      from price list
                    </span>
                  </div>
                </div>
              </div>

              {/* =================================================
                  OPTIONAL CALCULATION SWITCH
              ================================================== */}

              {selectedService.pricingType !== "fixed" && (
                <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={useCalculation}
                      onChange={(event) =>
                        setUseCalculation(
                          event.target.checked
                        )
                      }
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div>
                      <p className="font-bold text-blue-900">
                        Use quantity / dimensions
                      </p>

                      <p className="mt-1 text-sm text-blue-700">
                        Optional. Enable this only when you want
                        the quotation to calculate the amount
                        using quantity or dimensions.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* =================================================
                  OPTIONAL CALCULATION FIELDS
              ================================================== */}

              {useCalculation && (
                <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900">
                      Optional Calculation
                    </h3>

                    <p className="text-sm text-gray-500">
                      These fields are only used because you
                      enabled calculation.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {/* Quantity */}

                    {selectedService.pricingType ===
                      "quantity" && (
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Quantity
                        </label>

                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={quantity}
                          onChange={(event) =>
                            setQuantity(
                              event.target.value === ""
                                ? 1
                                : Number(
                                    event.target.value
                                  )
                            )
                          }
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    )}

                    {/* Width */}

                    {(selectedService.pricingType ===
                      "area" ||
                      selectedService.pricingType ===
                        "volume") && (
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Width
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={width}
                          onChange={(event) =>
                            setWidth(
                              event.target.value === ""
                                ? ""
                                : Number(
                                    event.target.value
                                  )
                            )
                          }
                          placeholder="Width"
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    )}

                    {/* Height */}

                    {(selectedService.pricingType ===
                      "area" ||
                      selectedService.pricingType ===
                        "volume") && (
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Height
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={height}
                          onChange={(event) =>
                            setHeight(
                              event.target.value === ""
                                ? ""
                                : Number(
                                    event.target.value
                                  )
                            )
                          }
                          placeholder="Height"
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    )}

                    {/* Depth */}

                    {selectedService.pricingType ===
                      "volume" && (
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Depth
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={depth}
                          onChange={(event) =>
                            setDepth(
                              event.target.value === ""
                                ? ""
                                : Number(
                                    event.target.value
                                  )
                            )
                          }
                          placeholder="Depth"
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  TOTAL PREVIEW
              ================================================== */}

              <div className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {useCalculation
                      ? "Calculated Service Total"
                      : "Price List Service Total"}
                  </p>

                  <p className="mt-1 text-2xl font-black text-gray-900">
                    {formatMoney(
                      currentItemTotal
                    )}{" "}
                    ETB
                  </p>

                  {!useCalculation && (
                    <p className="mt-1 text-xs text-gray-400">
                      Using price list price directly
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  {editingItemId && (
                    <button
                      type="button"
                      onClick={resetServiceFields}
                      className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={saveServiceItem}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
                  >
                    {editingItemId
                      ? "✓ Update Service"
                      : "+ Add Service"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          ADDED SERVICES
      ====================================================== */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Services in Quotation
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Review all services before saving.
              </p>
            </div>

            <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700">
              {items.length}
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
              🧾
            </div>

            <h3 className="font-bold text-gray-900">
              No services added
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Select a service from the price list above and
              click <strong>Add Service</strong>.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                  <th className="px-6 py-4">
                    #
                  </th>

                  <th className="px-6 py-4">
                    Service
                  </th>

                  <th className="px-6 py-4">
                    Measurement
                  </th>

                  <th className="px-6 py-4">
                    Price
                  </th>

                  <th className="px-6 py-4">
                    Unit
                  </th>

                  <th className="px-6 py-4">
                    Total
                  </th>

                  <th className="px-6 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-6 py-5 text-sm font-semibold text-gray-400">
                      {index + 1}
                    </td>

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-bold text-gray-900">
                          {item.service}
                        </p>

                        <p className="mt-1 max-w-xs text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
                        {getItemDetails(item)}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm font-semibold text-gray-700">
                      {formatMoney(
                        item.unitPrice
                      )}{" "}
                      ETB
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-gray-600">
                      {item.unit}
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-bold text-gray-900">
                        {formatMoney(
                          item.total
                        )}{" "}
                        ETB
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            editItem(item)
                          }
                          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            duplicateItem(item)
                          }
                          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                        >
                          Duplicate
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.id)
                          }
                          className="rounded-lg border border-red-100 bg-white px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* =====================================================
          NOTES
      ====================================================== */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-bold text-gray-900">
            Notes & Additional Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add special instructions or customer requirements.
          </p>
        </div>

        <div className="p-6">
          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            rows={5}
            placeholder="Additional notes, specifications, delivery instructions..."
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </section>

      {/* =====================================================
          SUMMARY
      ====================================================== */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              💰
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Quotation Summary
              </h2>

              <p className="text-sm text-gray-500">
                Review the final quotation amount.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          {/* DISCOUNT / TAX */}

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Discount
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={discount}
                  onChange={(event) =>
                    setDiscount(
                      event.target.value === ""
                        ? ""
                        : Number(event.target.value)
                    )
                  }
                  placeholder="0"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-16 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                  ETB
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Tax
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={tax}
                  onChange={(event) =>
                    setTax(
                      event.target.value === ""
                        ? ""
                        : Number(event.target.value)
                    )
                  }
                  placeholder="0"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-16 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                  ETB
                </span>
              </div>
            </div>
          </div>

          {/* SUMMARY */}

          <div className="rounded-2xl bg-gray-50 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Services
                </span>

                <span className="font-semibold text-gray-900">
                  {items.length}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-semibold text-gray-900">
                  {formatMoney(
                    subtotal
                  )}{" "}
                  ETB
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Discount
                </span>

                <span className="font-semibold text-red-600">
                  -{" "}
                  {formatMoney(
                    discountAmount
                  )}{" "}
                  ETB
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Tax
                </span>

                <span className="font-semibold text-gray-900">
                  +{" "}
                  {formatMoney(
                    taxAmount
                  )}{" "}
                  ETB
                </span>
              </div>

              <div className="border-t border-gray-200 pt-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Grand Total
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Amount payable
                    </p>
                  </div>

                  <p className="text-3xl font-black text-blue-600">
                    {formatMoney(
                      grandTotal
                    )}{" "}
                    ETB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FORM ACTIONS
      ====================================================== */}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={resetQuotationForm}
          disabled={saving}
          className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear Form
        </button>

        <button
          type="submit"
          disabled={
            saving ||
            items.length === 0
          }
          className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {saving
            ? "Saving Quotation..."
            : `Save Quotation • ${formatMoney(
                grandTotal
              )} ETB`}
        </button>
      </div>
    </form>
  );
}