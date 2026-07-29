import type { Metadata } from "next";
import { getAllArticleMetas } from "@/lib/articles";
import CategoryFilter from "@/components/CategoryFilter";

export const metadata: Metadata = {
  title: "Research",
  description:
    "All research from Parallax Research Group, on markets and technology.",
};

export default function ResearchPage() {
  const articles = getAllArticleMetas();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-teal)]">
        Research
      </p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
        All research
      </h1>
      <p className="mt-4 text-[var(--color-muted)] max-w-xl">
        Filter by category, or browse everything we've published.
      </p>

      <div className="mt-10">
        <CategoryFilter articles={articles} />
      </div>
    </div>
  );
}
