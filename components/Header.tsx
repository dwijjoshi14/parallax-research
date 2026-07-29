import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b border-[var(--color-line)] bg-[var(--color-paper)]/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Logo variant="header" />
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] sm:text-[13px] font-medium tracking-wide uppercase text-[var(--color-ink)]/80 hover:text-[var(--color-navy)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
