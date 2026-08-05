import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Parallax Research Group.",
};

// Set this to the Buttondown (or Substack) username once the account exists,
// e.g. "parallaxresearch". Leave blank to show the disabled fallback state.
const NEWSLETTER_USERNAME = "";

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
        
          href="mailto:parallaxresearchgroup@gmail.com"
          className="block text-lg font-medium text-[var(--color-navy)] hover:underline"
        >
          parallaxresearchgroup@gmail.com
        </a>
        <div className="flex gap-5 text-sm">
          
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--color-ink)]/80 hover:text-[var(--color-navy)] transition-colors"
          >
            LinkedIn
          </a>
          
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
          Get new research in your inbox as it's published.
        </p>

        {NEWSLETTER_USERNAME ? (
          <form
            action={`https://buttondown.com/api/emails/embed-subscribe/${NEWSLETTER_USERNAME}`}
            method="post"
            className="mt-5 flex max-w-md"
          >
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              aria-label="Email address"
              className="flex-1 border border-[var(--color-line)] px-4 py-3 text-sm bg-white"
            />
            <input type="hidden" name="embed" value="1" />
            <button
              type="submit"
              className="px-5 py-3 bg-[var(--color-navy)] text-white text-sm font-medium hover:bg-[var(--color-blue)] transition-colors"
            >
              Subscribe
            </button>
          </form>
        ) : (
          // Fallback shown until NEWSLETTER_USERNAME is set above. Once
          // Nirmay confirms the Buttondown (or Substack) account, fill in
          // that constant and this becomes a fully working form, no other
          // changes needed.
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
        )}
      </div>
    </div>
  );
}
