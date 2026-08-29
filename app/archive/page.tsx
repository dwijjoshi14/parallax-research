import type { Metadata } from "next";
import { getAllIssueMetas } from "@/lib/issues";
import IssueCard from "@/components/IssueCard";

export const metadata: Metadata = {
  title: "Archive",
  description: "Every past edition of the Parallax Morning Brief.",
};

export default function ArchivePage() {
  const issues = getAllIssueMetas();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-teal)]">
        Archive
      </p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
        Past editions
      </h1>
      <p className="mt-4 text-[var(--color-muted)] max-w-xl">
        Every Parallax Morning Brief we've sent, in one place.
      </p>

      {issues.length === 0 ? (
        <p className="mt-10 text-sm text-[var(--color-muted)] max-w-md">
          No editions archived yet. Every Morning Brief that goes out will
          land here once it's sent, subscribe below to get the next one
          directly.
        </p>
      ) : (
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6">
          {issues.map((issue) => (
            <IssueCard key={issue.slug} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}
