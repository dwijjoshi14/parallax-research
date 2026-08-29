import Link from "next/link";
import type { IssueMeta } from "@/lib/types";
import { formatDate } from "@/lib/format";

export default function IssueCard({ issue }: { issue: IssueMeta }) {
  return (
    <Link
      href={`/archive/${issue.slug}`}
      className="group block border-t border-[var(--color-line)] py-7 first:border-t-0 sm:first:border-t sm:py-0 sm:border-t-0 sm:h-full"
    >
      <article className="sm:h-full sm:flex sm:flex-col sm:border sm:border-[var(--color-line)] sm:p-7 transition-colors sm:hover:border-[var(--color-navy)]">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-teal)]">
            <span className="inline-block w-1.5 h-1.5 bg-[var(--color-teal)]" aria-hidden="true" />
            Morning Brief
          </span>
          <span className="text-xs text-[var(--color-muted)]">
            {issue.readingTime}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.01em] group-hover:text-[var(--color-navy)] transition-colors">
          {issue.title}
        </h3>

        <p className="mt-2.5 text-[15px] text-[var(--color-muted)] leading-relaxed sm:flex-grow">
          {issue.summary}
        </p>

        <div className="mt-5 text-xs text-[var(--color-muted)]">
          <time dateTime={issue.date}>{formatDate(issue.date)}</time>
        </div>
      </article>
    </Link>
  );
}
