"use client";

import { useRef, useState } from "react";
import { dashboardFetch } from "@/lib/dashboard-fetch";

type Details = {
  name: string;
  email: string;
  phone: string;
  event_date: string;
  start_time: string;
  location: string;
  hours: string;
  bartenders_needed: string;
  guest_count: string;
  total_price: string;
  deposit_amount: string;
  drinks_serving: string;
  service_type: string;
  deposit_paid: boolean;
  balance_paid: boolean;
};
type Draft = {
  agreement: { id: string; file_name: string; event_id: string | null };
  details: Details;
  warnings: string[];
  excerpt: string;
  already_imported: boolean;
};
const fields: {
  key: Exclude<
    keyof Details,
    "deposit_paid" | "balance_paid" | "drinks_serving" | "service_type"
  >;
  label: string;
  type: string;
  required?: boolean;
  max?: number;
  step?: string;
}[] = [
  { key: "name", label: "Customer name", type: "text", required: true },
  { key: "email", label: "Customer email", type: "email" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "event_date", label: "Event date", type: "date", required: true },
  { key: "start_time", label: "Start time", type: "time" },
  { key: "location", label: "Event location", type: "text", required: true },
  {
    key: "hours",
    label: "Service hours (whole hours)",
    type: "number",
    required: true,
    max: 168,
  },
  {
    key: "bartenders_needed",
    label: "Bartenders needed",
    type: "number",
    required: true,
    max: 100,
  },
  { key: "guest_count", label: "Guest count", type: "number", max: 100000 },
  {
    key: "total_price",
    label: "Agreed total ($)",
    type: "number",
    required: true,
    max: 1000000,
    step: "0.01",
  },
  {
    key: "deposit_amount",
    label: "Deposit amount ($)",
    type: "number",
    required: true,
    max: 1000000,
    step: "0.01",
  },
];

export default function AgreementImport({
  api,
  onImported,
}: {
  api: string;
  onImported: (id: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [allowDuplicate, setAllowDuplicate] = useState(false);
  async function upload(file: File | undefined) {
    if (!file || busyRef.current) return;
    setError("");
    setSuccess("");
    setDraft(null);
    setReviewed(false);
    setDuplicate(false);
    setAllowDuplicate(false);
    if (file.size > 10 * 1024 * 1024 || !/\.(pdf|docx)$/i.test(file.name)) {
      setError("Choose a PDF or Word (.docx) agreement, up to 10 MB.");
      return;
    }
    busyRef.current = true;
    setBusy(true);
    try {
      const body = new FormData();
      body.append("agreement", file);
      const res = await dashboardFetch(`${api}/api/agreements/upload`, {
        method: "POST",
        body,
      });
      const data = await res
        .json()
        .catch(() => ({
          error:
            "Uploads are not available yet. The updated API needs to be published.",
        }));
      if (!res.ok)
        throw new Error(data.error || "The upload failed. Please try again.");
      setDraft(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "The upload failed. Please try again.",
      );
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }
  function change<K extends keyof Details>(key: K, value: Details[K]) {
    setDraft((current) =>
      current
        ? { ...current, details: { ...current.details, [key]: value } }
        : null,
    );
    setReviewed(false);
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!draft || !reviewed || busyRef.current) return;
    if (
      Number(draft.details.deposit_amount) > Number(draft.details.total_price)
    ) {
      setError("The deposit cannot exceed the total price.");
      return;
    }
    busyRef.current = true;
    setBusy(true);
    setError("");
    try {
      const res = await dashboardFetch(
        `${api}/api/agreements/${draft.agreement.id}/import`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            details: draft.details,
            reviewed,
            allow_duplicate: allowDuplicate,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        if (data.code === "POSSIBLE_DUPLICATE") setDuplicate(true);
        throw new Error(data.error || "Could not add the event.");
      }
      setDraft(null);
      setSuccess(
        "Event added. The signed agreement is attached to its details.",
      );
      try {
        await onImported(data.event_id);
      } catch {
        setSuccess("Event saved. Refresh the dashboard to see it in the list.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not add the event. Try again; repeat requests won't create a second event.",
      );
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }
  return (
    <section className="mb-8 rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl">Add an Event from an Agreement</h2>
          <p className="mt-1 text-sm text-gray-600">
            Upload the signed agreement, review the details, and add it to your
            event list.
          </p>
        </div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="agreement-upload"
          onClick={() => setExpanded(!expanded)}
          className="rounded bg-black px-4 py-2 text-sm text-white"
        >
          {expanded ? "Hide Upload" : "Upload Agreement"}
        </button>
      </div>
      {success && (
        <p role="status" className="mt-4 text-green-800">
          {success}
        </p>
      )}
      {expanded && (
        <div id="agreement-upload" className="mt-5 border-t pt-5">
          <label
            htmlFor="signed-agreement"
            className="block text-sm font-medium"
          >
            Signed agreement · PDF or Word (.docx)
          </label>
          <input
            id="signed-agreement"
            type="file"
            accept=".pdf,.docx"
            disabled={busy}
            onChange={(e) => {
              void upload(e.target.files?.[0]);
              e.target.value = "";
            }}
            className="mt-2 block w-full text-sm file:mr-4 file:rounded file:border file:bg-gray-50 file:px-4 file:py-2"
          />
          <p className="mt-2 text-xs text-gray-600">
            Up to 10 MB and 30 PDF pages. Scanned PDFs can be attached, with
            details entered manually. Agreements are private to the admin team.
          </p>
          {busy && (
            <p role="status" className="mt-4">
              {draft ? "Adding event…" : "Reading and saving agreement…"}
            </p>
          )}
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {error}
            </p>
          )}
          {draft?.already_imported && (
            <p role="status" className="mt-4 rounded bg-amber-50 p-4 text-sm">
              This exact agreement has already been imported. No second event
              was created. If the event was cancelled, its agreement and payment
              history are still retained.
            </p>
          )}
          {draft && !draft.already_imported && (
            <form onSubmit={save} className="mt-5">
              <h3 className="font-medium">
                Review {draft.agreement.file_name}
              </h3>
              <div className="my-4 rounded bg-amber-50 p-3 text-sm text-amber-950">
                {draft.warnings.map((w) => (
                  <p key={w} className="mb-1">
                    {w}
                  </p>
                ))}
              </div>
              {draft.excerpt && (
                <details className="mb-4 text-sm">
                  <summary className="cursor-pointer underline">
                    Show extracted text
                  </summary>
                  <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded bg-gray-50 p-3 font-sans">
                    {draft.excerpt}
                  </pre>
                </details>
              )}
              <fieldset
                disabled={busy}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                <legend className="sr-only">Event details</legend>
                {fields.map((field) => (
                  <label key={field.key} className="text-sm">
                    {field.label}
                    {field.required ? " *" : ""}
                    <input
                      type={field.type}
                      required={field.required}
                      min={
                        field.key === "hours"
                          ? 1
                          : field.type === "number"
                            ? 0
                            : undefined
                      }
                      max={field.max}
                      step={
                        field.step ||
                        (field.type === "number" ? "1" : undefined)
                      }
                      maxLength={
                        field.key === "location"
                          ? 1000
                          : field.key === "email"
                            ? 254
                            : field.key === "phone"
                              ? 50
                              : 200
                      }
                      value={draft.details[field.key]}
                      onChange={(e) => change(field.key, e.target.value)}
                      className="mt-1 block w-full rounded border bg-white p-2"
                    />
                  </label>
                ))}
                <label className="text-sm">
                  Service type *
                  <select
                    required
                    value={draft.details.service_type}
                    onChange={(e) => change("service_type", e.target.value)}
                    className="mt-1 block w-full rounded border bg-white p-2"
                  >
                    <option value="">Choose service</option>
                    <option value="bartending">
                      Bartending / trailer rental
                    </option>
                    <option value="soda">Dirty soda bar</option>
                  </select>
                </label>
                <label className="text-sm sm:col-span-2 lg:col-span-3">
                  Drinks Serving
                  <textarea
                    value={draft.details.drinks_serving}
                    onChange={(e) => change("drinks_serving", e.target.value)}
                    maxLength={2000}
                    rows={3}
                    placeholder="For example: beer, wine, margaritas, lemonade"
                    className="mt-1 block w-full rounded border p-2"
                  />
                </label>
                <div className="space-y-3 text-sm sm:col-span-2 lg:col-span-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={draft.details.deposit_paid}
                      onChange={(e) => {
                        change("deposit_paid", e.target.checked);
                        if (!e.target.checked) change("balance_paid", false);
                      }}
                    />
                    I have verified that the deposit was paid.
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      disabled={!draft.details.deposit_paid}
                      checked={draft.details.balance_paid}
                      onChange={(e) => change("balance_paid", e.target.checked)}
                    />
                    I have verified that the full remaining balance was paid.
                  </label>
                  <p className="text-gray-600">
                    Importing records the event and payment status you enter. It
                    does not charge the customer or send an email. Imported
                    events start with automatic payment reminders off.
                  </p>
                  {duplicate && (
                    <label className="flex items-start gap-2 rounded bg-amber-50 p-3">
                      <input
                        type="checkbox"
                        checked={allowDuplicate}
                        onChange={(e) => setAllowDuplicate(e.target.checked)}
                        className="mt-1"
                      />
                      I checked the existing event. This agreement is for a
                      separate event on the same date.
                    </label>
                  )}
                  <label className="flex items-center gap-2">
                    <input
                      required
                      type="checkbox"
                      checked={reviewed}
                      onChange={(e) => setReviewed(e.target.checked)}
                    />
                    I checked these details against the signed agreement.
                  </label>
                </div>
              </fieldset>
              <button
                type="submit"
                disabled={busy || !reviewed || (duplicate && !allowDuplicate)}
                className="mt-5 rounded bg-black px-5 py-3 text-sm text-white disabled:opacity-50"
              >
                {busy ? "Adding Event…" : "Add Event to Dashboard"}
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
}
