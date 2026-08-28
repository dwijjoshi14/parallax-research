"use client";

import { useState } from "react";

const CONSENT_TEXT =
  "Subscribe to the Parallax Morning Brief. You'll receive market research emails from Parallax Research Group and can unsubscribe at any time.";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("done");
      setMessage(data.message || "Check your inbox to confirm your subscription.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-5 text-sm text-[var(--color-navy)] font-medium max-w-md font-sans">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 max-w-md font-sans">
      <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-3">
        {CONSENT_TEXT}
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 border border-[var(--color-line)] bg-white px-3 py-2 text-sm font-sans focus:outline-none focus:border-[var(--color-navy)]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[var(--color-navy)] text-white text-sm font-medium font-sans px-5 py-2 hover:bg-[var(--color-blue)] transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-700 font-sans">{message}</p>
      )}
    </form>
  );
}
