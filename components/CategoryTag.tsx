import type { Category } from "@/lib/types";

export default function CategoryTag({ category }: { category: Category }) {
  const color =
    category === "Markets" ? "var(--color-navy)" : "var(--color-teal)";

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase"
      style={{ color }}
    >
      <span
        className="inline-block w-1.5 h-1.5"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      {category}
    </span>
  );
}
