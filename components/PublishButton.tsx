"use client";

import { useState } from "react";

export default function PublishButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handlePublish() {
    const confirmed = window.confirm(
      "Publish public changes to GitHub?\n\n" +
        "This will update prices and service images on the public website.\n\n" +
        "Private quotations will NOT be published."
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/publish", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Publishing failed.");
        return;
      }

      setMessage(data.message || "Published successfully.");
    } catch (err) {
      console.error(err);

      setError(
        "Could not connect to the local publishing service."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handlePublish}
        disabled={loading}
        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Publishing..." : "🚀 Publish Changes"}
      </button>

      {message && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 shadow-lg">
          <p className="font-semibold">
            ✓ Success
          </p>

          <p className="mt-1">
            {message}
          </p>

          <button
            type="button"
            onClick={() => setMessage("")}
            className="mt-3 text-xs font-semibold underline"
          >
            Close
          </button>
        </div>
      )}

      {error && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-lg">
          <p className="font-semibold">
            ✕ Publishing Failed
          </p>

          <p className="mt-1 whitespace-pre-wrap">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setError("")}
            className="mt-3 text-xs font-semibold underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}