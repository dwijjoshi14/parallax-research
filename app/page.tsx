import Link from "next/link";
import { getRecentIssues } from "@/lib/issues";
import IssueCard from "@/components/IssueCard";
import ScrollReveal from "@/components/ScrollReveal";
import BrandMotif from "@/components/BrandMotif";
import NewsletterForm from "@/components/NewsletterForm";

const STEPS = [
  {
    n: "01",
    title: "Ingest",
    body: "Each morning, the pipeline pulls in selected market newsletters and market data, not a single feed, a spread of sources.",
  },
  {
    n: "02",
    title: "Rank",
    body: "Everything gets ranked for what's actually likely to matter today, not just what's loudest.",
  },
  {
    n: "03",
    title: "Synthesize & validate",
    body: "The ranked material becomes one editorial brief in plain language, then it's checked before anything goes out.",
  },
  {
    n: "04",
    title: "Deliver",
    body: "The finished brief lands directly in your inbox, no separate app or feed to check.",
  },
];

export default function HomePage() {
  const recentIssues = getRecentIssues(3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <BrandMotif className="pointer-events-none absolute right-[-120px] top-[-60px] hidden lg:block w-[520px] h-[520px] opacity-70" />
        <BrandMotif className="pointer-events-none absolute right-[40px] top-[180px] hidden xl:block w-[220px] h-[220px] opacity-40" />

        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-teal)]">
              Parallax Research Group
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.08]">
              One brief every morning.
              <span className="relative inline-block ml-2">
                <span aria-hidden="true" className="absolute inset-0 translate-x-[6px] translate-y-[3px] text-[var(--color-teal)]/40 select-none">
                  Two vantage points.
                </span>
                <span className="relative">Two vantage points.</span>
              </span>
            </h1>
            <p className="mt-5 text-lg text-[var(--color-muted)] leading-relaxed max-w-xl">
              The Parallax Morning Brief is independent research on markets,
              economics, and technology, delivered directly to your inbox.
              No feed to check, no narrative to untangle yourself.
            </p>
          </div>

          {/* Newsletter card, the actual point of this page */}
          <div className="relative mt-10 max-w-xl">
            <div className="absolute -left-3 top-3 bottom-3 w-1.5 bg-[var(--color-teal)] hidden sm:block" aria-hidden="true" />
            <div className="bg-white border border-[var(--color-line)] p-7 sm:p-8">
              <h2 className="text-lg font-semibold tracking-[-0.01em]">
                Get the next edition
              </h2>
              <NewsletterForm />
              <p className="mt-4 text-xs text-[var(--color-muted)]">
                One email. No spam. Unsubscribe any time.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <Link
              href="/archive"
              className="text-sm font-medium text-[var(--color-ink)]/80 hover:text-[var(--color-navy)] transition-colors"
            >
              Read past editions
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-[var(--color-ink)]/80 hover:text-[var(--color-navy)] transition-colors"
            >
              About the group
            </Link>
          </div>
        </div>
      </section>

      {/* How it's made, full-bleed navy band */}
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <ScrollReveal>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-teal)]">
              How it's made
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-[-0.02em] max-w-xl">
              Not a headline aggregator. An actual editorial process.
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 100}>
                <div className="border-t border-white/15 pt-5">
                  <span className="text-[13px] font-semibold tracking-[0.1em] text-[var(--color-teal)]">
                    {step.n}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent issues */}
      <section className="border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <ScrollReveal>
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-ink)]/70">
                Recent editions
              </h2>
              <Link
                href="/archive"
                className="text-sm font-medium text-[var(--color-navy)] hover:underline"
              >
                View all
              </Link>
            </div>
          </ScrollReveal>

          {recentIssues.length === 0 ? (
            <p className="mt-10 text-sm text-[var(--color-muted)] max-w-md">
              No editions archived yet. Every Morning Brief that goes out
              will land here once it's sent, subscribe above to get the
              next one directly.
            </p>
          ) : (
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6">
              {recentIssues.map((issue, i) => (
                <ScrollReveal key={issue.slug} delay={i * 100}>
                  <IssueCard issue={issue} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
