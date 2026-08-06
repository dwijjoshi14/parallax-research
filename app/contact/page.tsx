import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Parallax Research Group.",
};

// Set this once Nirmay sends the real publication URL. Leave handle blank to
// show the disabled fallback state. provider controls which embed renders:
// "substack" uses their iframe embed, "buttondown" uses the form embed.
const NEWSLETTER: { provider: "substack" | "buttondown"; handle: string } = {
  provider: "substack",
  handle: "", // e.g. "parallaxresearch" for a Substack at parallaxresearch.substack.com
};

// Each link renders unlinked until its own URL is set below, rather than
// pointing at a generic homepage.
const LINKEDIN_URL = "https://linkedin.com/company/parallax-research-group";
const MEDIUM_URL = "";

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
          {LINKEDIN_URL ? (
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[var(--color-ink)]/80 hover:text-[var(--color-navy)] transition-colors"
            >
              LinkedIn
            </a>
          ) : (
            <span
              className="text-[var(--color-ink)]/40 cursor-default"
              aria-disabled="true"
              title="Coming soon"
            >
              LinkedIn
            </span>
          )}
          {MEDIUM_URL ? (
            <a
              href={MEDIUM_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[var(--color-ink)]/80 hover:text-[var(--color-navy)] transition-colors"
            >
              Medium
            </a>
          ) : (
            <span
              className="text-[var(--color-ink)]/40 cursor-default"
              aria-disabled="true"
              title="Coming soon"
            >
              Medium
            </span>
          )}
        </div>
      </div>

      <div className="mt-16 border-t border-[var(--color-line)] pt-10">
        <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-ink)]/70">
          Newsletter
        </h2>
        <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed max-w-md">
          Get new research in your inbox as it's published.
        </p>

        {NEWSLETTER.handle && NEWSLETTER.provider === "substack" ? (
          <iframe
            src={`https://${NEWSLETTER.handle}.substack.com/embed`}
            width="480"
            height="150"
            style={{ border: "1px solid var(--color-line)", background: "white" }}
            className="mt-5 max-w-md w-full"
            title="Subscribe to the Parallax Research Group newsletter"
          />
        ) : NEWSLETTER.handle && NEWSLETTER.provider === "buttondown" ? (
          <form
            action={`https://buttondown.com/api/emails/embed-subscribe/${NEWSLETTER.handle}`}
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
          // Fallback shown until NEWSLETTER.handle is set above. Once Nirmay
          // sends the Substack (or Buttondown) publication URL, fill in the
          // handle and provider and this becomes a fully working embed, no
          // other changes needed.
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
