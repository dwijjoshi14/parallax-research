import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmation link issue",
};

export default function ConfirmErrorPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-teal)]">
        Parallax Morning Brief
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[var(--color-navy)]">
        That link didn't work.
      </h1>
      <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
        This confirmation link may have expired or already been used. You
        can subscribe again from the contact page.
      </p>
    </div>
  );
}
