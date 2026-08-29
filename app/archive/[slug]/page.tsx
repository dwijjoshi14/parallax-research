import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getIssueBySlug,
  getAllSlugs,
  getOtherIssues,
  formatDate,
} from "@/lib/issues";
import IssueCard from "@/components/IssueCard";
import ArticleBody from "@/components/ArticleBody";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssueBySlug(slug);
  if (!issue) return {};

  return {
    title: issue.title,
    description: issue.summary,
    openGraph: {
      title: issue.title,
      description: issue.summary,
      type: "article",
      publishedTime: issue.date,
    },
    twitter: {
      card: "summary_large_image",
      title: issue.title,
      description: issue.summary,
    },
  };
}

export default async function IssuePage({ params }: PageProps) {
  const { slug } = await params;
  const issue = getIssueBySlug(slug);
  if (!issue) notFound();

  const others = getOtherIssues(issue.slug, 3);

  return (
    <article>
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-10 sm:pt-20">
        <Link
          href="/archive"
          className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-navy)] transition-colors"
        >
          &larr; Archive
        </Link>

        <div className="mt-6">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-teal)]">
            <span className="inline-block w-1.5 h-1.5 bg-[var(--color-teal)]" aria-hidden="true" />
            Morning Brief
          </span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-tight">
          {issue.title}
        </h1>

        <div className="mt-5 flex items-center gap-3 text-sm text-[var(--color-muted)]">
          <time dateTime={issue.date}>{formatDate(issue.date)}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{issue.readingTime}</span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-20">
        <ArticleBody content={issue.content} />
      </div>

      {others.length > 0 && (
        <div className="border-t border-[var(--color-line)]">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-ink)]/70">
              More issues
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6">
              {others.map((o) => (
                <IssueCard key={o.slug} issue={o} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
