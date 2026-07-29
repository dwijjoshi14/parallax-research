import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArticleBySlug,
  getAllSlugs,
  getRelatedArticles,
  formatDate,
} from "@/lib/articles";
import CategoryTag from "@/components/CategoryTag";
import ArticleCard from "@/components/ArticleCard";
import ArticleBody from "@/components/ArticleBody";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  return (
    <article>
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-10 sm:pt-20">
        <Link
          href="/research"
          className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-navy)] transition-colors"
        >
          &larr; Research
        </Link>

        <div className="mt-6">
          <CategoryTag category={article.category} />
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-tight">
          {article.title}
        </h1>

        <div className="mt-5 flex items-center gap-3 text-sm text-[var(--color-muted)]">
          <span className="font-medium text-[var(--color-ink)]">{article.author}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{article.readingTime}</span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-20">
        <ArticleBody content={article.content} />
      </div>

      {related.length > 0 && (
        <div className="border-t border-[var(--color-line)]">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-ink)]/70">
              Related articles
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6">
              {related.map((r) => (
                <ArticleCard key={r.slug} article={r} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
