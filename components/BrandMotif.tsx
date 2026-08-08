/**
 * Decorative abstract graphic echoing the layered-planes logo mark.
 * Purely visual, not a data chart, safe to use anywhere as a background
 * accent without implying it represents actual research figures.
 */
export default function BrandMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          x="60"
          y="150"
          width="220"
          height="130"
          transform="skewX(-12)"
          fill="var(--color-navy)"
          opacity="0.08"
        />
        <rect
          x="110"
          y="110"
          width="220"
          height="130"
          transform="skewX(-12)"
          fill="var(--color-teal)"
          opacity="0.12"
        />
        <rect
          x="160"
          y="70"
          width="220"
          height="130"
          transform="skewX(-12)"
          fill="var(--color-blue)"
          opacity="0.18"
        />
      </g>
    </svg>
  );
}
