import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribed",
};

export default function ConfirmedPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-teal)]">
        Parallax Morning Brief
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[var(--color-navy)]">
        You're subscribed.
      </h1>
      <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
        You'll get the Parallax Morning Brief in your inbox as soon as the
        next one goes out.
      </p>
    </div>
  );
}
