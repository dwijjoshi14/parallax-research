import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Parallax Research Group.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-teal)]">
        Contact
      </p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
        Get in touch
      </h1>
      <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
        For questions, tips, or collaboration inquiries, reach us directly or
        find us elsewhere.
      </p>

      <div className="mt-10 space-y-3">
        <a
          href="mailto:hello@parallaxresearch.group"
          className="block text-lg font-medium text-[var(--color-navy)] hover:underline"
        >
          hello@parallaxresearch.group
        </a>
        <div className="flex gap-5 text-sm">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--color-ink)]/80 hover:text-[var(--color-navy)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://medium.com"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--color-ink)]/80 hover:text-[var(--color-navy)] transition-colors"
          >
            Medium
          </a>
        </div>
      </div>

      <div className="mt-16 border-t border-[var(--color-line)] pt-10">
        <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-ink)]/70">
          Newsletter
        </h2>
        <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed max-w-md">
          Get new research in your inbox. This form is a placeholder, it
          isn't wired up to an email provider yet.
        </p>

        {/* Placeholder signup field. No <form> submission handler is wired
            up: connect this to an email provider (Mailchimp, Buttondown,
            ConvertKit, etc.) before going live. */}
        <div className="mt-5 flex max-w-md">
          <input
            type="email"
            placeholder="you@example.com"
            disabled
            aria-label="Email address"
            className="flex-1 border border-[var(--color-line)] px-4 py-3 text-sm bg-white disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            disabled
            className="px-5 py-3 bg-[var(--color-navy)] text-white text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
