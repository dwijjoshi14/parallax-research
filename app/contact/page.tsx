import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Parallax Research Group.",
};

const LINKEDIN_URL = "https://linkedin.com/company/parallax-research-group";

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
          href="mailto:parallaxresearchgroup@gmail.com"
          className="block text-lg font-medium text-[var(--color-navy)] hover:underline"
        >
          parallaxresearchgroup@gmail.com
        </a>
        <div className="flex gap-5 text-sm">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--color-ink)]/80 hover:text-[var(--color-navy)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="mt-16 border-t border-[var(--color-line)] pt-10">
        <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-ink)]/70">
          Newsletter
        </h2>
        <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed max-w-md">
          Get the Parallax Morning Brief in your inbox as it's published.
        </p>

        <NewsletterForm />
      </div>
    </div>
  );
}
