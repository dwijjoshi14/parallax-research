import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribed",
};

export default async function ConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ already?: string }>;
}) {
  const params = await searchParams;
  const already = params.already === "true";

  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-teal)]">
        Parallax Morning Brief
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[var(--color-navy)]">
        {already ? "You're already subscribed." : "You're subscribed."}
      </h1>
      <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
        {already
          ? "This confirmation link has already been used. You're all set, no further action needed."
          : "You'll get the Parallax Morning Brief in your inbox as soon as the next one goes out."}
      </p>
    </div>
  );
}
