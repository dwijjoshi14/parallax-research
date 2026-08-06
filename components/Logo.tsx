import Link from "next/link";
import Image from "next/image";

/**
 * Parallax Research Group horizontal lockup, using the final production
 * exports from the identity board (stored in /public/brand). "header" is
 * the primary navy/teal version for light backgrounds; "footer" is the
 * transparent white-on-navy version, made to sit directly on the site's
 * navy footer without its own background block.
 */
export default function Logo({
  variant = "header",
}: {
  variant?: "header" | "footer";
}) {
  const src =
    variant === "header"
      ? "/brand/07_horizontal_primary.png"
      : "/brand/12_horizontal_white_on_navy.png";

  return (
    <Link
      href="/"
      className="flex items-center shrink-0"
      aria-label="Parallax Research Group, home"
    >
      <Image
        src={src}
        alt="Parallax Research Group"
        width={1600}
        height={296}
        className="h-7 sm:h-8 w-auto"
        priority={variant === "header"}
      />
    </Link>
  );
}
