import Link from "next/link";

/**
 * Parallax Research Group mark.
 *
 * Recreated as inline SVG from the brand identity boards (two brand board
 * exports live in /public/brand for reference). This is a hand-vectored
 * approximation of the symbol: two kite shapes, one navy, one teal, sharing
 * a center seam and converging on a single point, echoing the idea of two
 * viewpoints meeting on one object.
 *
 * TODO(replace-logo): if final production SVG/PNG exports of the mark
 * become available (transparent background, favicon sizes, dark-bg
 * version), swap them in here instead of this recreation for pixel-exact
 * output. Keep the ~28px box and gap-2.5 spacing so header alignment
 * doesn't shift.
 */
export default function Logo({ variant = "header" }: { variant?: "header" | "footer" }) {
  const wordmarkColor = variant === "header" ? "var(--color-navy)" : "var(--color-paper)";
  const subColor = variant === "header" ? "var(--color-muted)" : "#ffffff";

  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 shrink-0"
      aria-label="Parallax Research Group, home"
    >
      <svg
        width="30"
        height="26"
        viewBox="0 0 40 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon points="14,6 20,14 20,27 6,16" fill="var(--color-navy)" />
        <polygon points="26,6 20,14 20,27 34,16" fill="var(--color-teal)" />
        <circle cx="20" cy="27" r="2.6" fill="var(--color-teal)" stroke="var(--color-paper)" strokeWidth="0.75" />
      </svg>
      <span className="leading-tight">
        <span
          className="block text-[13px] font-bold tracking-[0.14em] uppercase"
          style={{ color: wordmarkColor }}
        >
          Parallax
        </span>
        <span
          className="hidden sm:block text-[9px] font-medium tracking-[0.22em] uppercase"
          style={{ color: subColor }}
        >
          Research Group
        </span>
      </span>
    </Link>
  );
}
