import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Parallax Research Group.",
};

// Substack is our only "elsewhere" channel besides LinkedIn — Medium was
// dropped entirely (Nirmay, Aug 2026). provider is kept in case we ever
// move to Buttondown, but it's locked to "substack" for now.
const NEWSLETTER: { provider: "substack" | "buttondown"; handle: string } = {
  provider: "substack",
  handle: "theprg", // https://theprg.substack.com — verify this resolves before shipping
};

const LINKEDIN_URL = "https://linkedin.com/company/parallax-research-group";
const SUBSTACK_URL = "https://substack.com/@theprg";

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
          
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--color-ink)]/80 hover:text-[var(--color-navy)] transition-colors"
          >
            LinkedIn
          </a>
          
            href={SUBSTACK_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--color-ink)]/80 hover:text-[var(--color-navy)] transition-colors"
          >
            Substack
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

        <iframe
          src={`https://${NEWSLETTER.handle}.substack.com/embed`}
          width="480"
          height="150"
          style={{ border: "1px solid var(--color-line)", background: "white" }}
          className="mt-5 max-w-md w-full"
          title="Subscribe to the Parallax Research Group newsletter"
        />
      </div>
    </div>
  );
}
