import Link from "next/link";
import type { ArticleMeta } from "@/lib/types";
import { formatDate } from "@/lib/format";
import CategoryTag from "./CategoryTag";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/research/${article.slug}`}
      className="group block border-t border-[var(--color-line)] py-7 first:border-t-0 sm:first:border-t sm:py-0 sm:border-t-0 sm:h-full"
    >
      <article className="sm:h-full sm:flex sm:flex-col sm:border sm:border-[var(--color-line)] sm:p-7 transition-colors sm:hover:border-[var(--color-navy)]">
        <div className="flex items-center justify-between gap-3">
          <CategoryTag category={article.category} />
          <span className="text-xs text-[var(--color-muted)]">
            {article.readingTime}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.01em] group-hover:text-[var(--color-navy)] transition-colors">
          {article.title}
        </h3>

        <p className="mt-2.5 text-[15px] text-[var(--color-muted)] leading-relaxed sm:flex-grow">
          {article.summary}
        </p>

        <div className="mt-5 text-xs text-[var(--color-muted)] flex items-center gap-2">
          <span>{article.author}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </div>
      </article>
    </Link>
  );
}
