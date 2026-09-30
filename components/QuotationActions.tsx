"use client";

import { useState } from "react";

export default function QuotationActions({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const link =
    typeof window !== "undefined"
      ? `${window.location.origin}/admin/quotations/${id}`
      : "";

  async function copyLink() {
    await navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function shareLink() {
    const url = `${window.location.origin}/admin/quotations/${id}`;

    if (navigator.share) {
      navigator.share({
        title: "GNF Printing Quotation",
        text: "View this quotation",
        url,
      });
    } else {
      copyLink();
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={shareLink}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        🔗 Share Link
      </button>

      <button
        onClick={copyLink}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        {copied ? "✓ Copied!" : "📋 Copy Link"}
      </button>
    </div>
  );
}