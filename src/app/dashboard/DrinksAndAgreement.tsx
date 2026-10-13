"use client";

import { useEffect, useState } from "react";
import { dashboardFetch } from "@/lib/dashboard-fetch";

export default function DrinksAndAgreement({
  api,
  eventId,
  drinks,
  onSaved,
}: {
  api: string;
  eventId: string;
  drinks: string;
  onSaved: (value: string) => void;
}) {
  const [value, setValue] = useState(drinks);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [agreement, setAgreement] = useState<{
    file_name: string;
    url: string;
  } | null>(null);
  const [fileError, setFileError] = useState("");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let active = true;
    dashboardFetch(`${api}/api/agreements/event/${eventId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load the attached agreement.");
        const data = await res.json();
        if (active) {
          setAgreement(data.agreement);
          setFileError("");
        }
      })
      .catch(() => {
        if (active) setFileError("Could not load the attached agreement.");
      });
    return () => {
      active = false;
    };
  }, [api, eventId, refresh]);
  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const res = await dashboardFetch(`${api}/api/events/${eventId}/drinks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drinks_serving: value }),
      });
      if (!res.ok) throw new Error();
      onSaved(value.trim());
      setMessage("Drinks saved.");
    } catch {
      setMessage("Could not save the drinks. Please try again.");
    } finally {
      setSaving(false);
    }
  }
  return (
    <section className="mb-6 rounded-lg border p-4">
      <label htmlFor="event-drinks" className="block font-medium mb-2">
        Drinks Serving
      </label>
      <textarea
        id="event-drinks"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={2000}
        rows={3}
        placeholder="Beer, wine, margaritas, dirty soda…"
        className="w-full rounded border p-2 text-sm"
      />
      <button
        type="button"
        disabled={saving}
        onClick={save}
        className="mt-2 rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Drinks"}
      </button>
      {message && (
        <p role="status" className="mt-2 text-sm">
          {message}
        </p>
      )}
      {agreement && (
        <div className="mt-4 border-t pt-4 text-sm">
          <p className="font-medium">Signed agreement</p>
          <a
            href={agreement.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline break-words"
          >
            Download {agreement.file_name}
          </a>
          <button
            type="button"
            onClick={() => setRefresh((n) => n + 1)}
            className="mt-2 block text-xs underline"
          >
            Refresh download link
          </button>
        </div>
      )}
      {fileError && (
        <p role="status" className="mt-3 text-sm">
          {fileError}{" "}
          <button
            type="button"
            className="underline"
            onClick={() => setRefresh((n) => n + 1)}
          >
            Retry
          </button>
        </p>
      )}
    </section>
  );
}
