import Link from "next/link";
import { getRecentArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export default function HomePage() {
  const recentArticles = getRecentArticles(3);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-teal)]">
            Parallax Research Group
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.1]">
            Independent research across markets, economics, and technology.
          </h1>
          <p className="mt-5 text-lg text-[var(--color-muted)] leading-relaxed max-w-xl">
            Parallax is our method: we examine each subject from more than one
            angle, rather than settling for whichever narrative is loudest.
          </p>
          <div className="mt-8 flex items-center gap-5">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 bg-[var(--color-navy)] text-white text-sm font-medium px-5 py-3 hover:bg-[var(--color-blue)] transition-colors"
            >
              Read the research
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

      {/* Recent articles */}
      <section className="border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-ink)]/70">
              Recent research
            </h2>
            <Link
              href="/research"
              className="text-sm font-medium text-[var(--color-navy)] hover:underline"
            >
              View all
            </Link>
          </div>

          {recentArticles.length === 0 ? (
            <p className="mt-10 text-sm text-[var(--color-muted)]">
              No articles published yet. Drop an .mdx file into
              content/articles to get started.
            </p>
          ) : (
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6">
              {recentArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
