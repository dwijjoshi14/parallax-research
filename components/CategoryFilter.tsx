"use client";

import { useMemo, useState } from "react";
import type { ArticleMeta, Category } from "@/lib/types";
import ArticleCard from "./ArticleCard";

const OPTIONS: Array<Category | "All"> = ["All", "Markets", "Technology"];

export default function CategoryFilter({ articles }: { articles: ArticleMeta[] }) {
  const [active, setActive] = useState<Category | "All">("All");

  const filtered = useMemo(
    () => (active === "All" ? articles : articles.filter((a) => a.category === active)),
    [active, articles]
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter by category"
        className="flex items-center gap-1 border border-[var(--color-line)] w-fit"
      >
        {OPTIONS.map((option) => {
          const isActive = option === active;
          return (
            <button
              key={option}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(option)}
              className={`px-4 py-2 text-[13px] font-medium tracking-wide transition-colors ${
                isActive
                  ? "bg-[var(--color-navy)] text-white"
                  : "text-[var(--color-ink)]/70 hover:text-[var(--color-navy)]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-[var(--color-muted)]">
          No articles in this category yet.
        </p>
      ) : (
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
