import Logo from "./Logo";

// Each link renders unlinked until its own URL is set below, rather than
// pointing at a generic homepage.
const LINKEDIN_URL = "https://linkedin.com/company/parallax-research-group";
const MEDIUM_URL = "";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-navy)] text-white mt-24">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <Logo variant="footer" />
          <p className="mt-4 text-sm text-white/70 max-w-xs leading-relaxed">
            Independent research across markets, economics, and technology,
            each subject examined from more than one angle.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/50">
            Elsewhere
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              {LINKEDIN_URL ? (
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer noopener" className="text-white/80 hover:text-white transition-colors">LinkedIn</a>
              ) : (
                <span className="text-white/40 cursor-default" aria-disabled="true" title="Coming soon">LinkedIn</span>
              )}
            </li>
            <li>
              {MEDIUM_URL ? (
                <a href={MEDIUM_URL} target="_blank" rel="noreferrer noopener" className="text-white/80 hover:text-white transition-colors">Medium</a>
              ) : (
                <span className="text-white/40 cursor-default" aria-disabled="true" title="Coming soon">Medium</span>
              )}
            </li>
            <li><a href="mailto:parallaxresearchgroup@gmail.com" className="text-white/80 hover:text-white transition-colors">parallaxresearchgroup@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/50">
            Site
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="/research" className="text-white/80 hover:text-white transition-colors">Research</a></li>
            <li><a href="/about" className="text-white/80 hover:text-white transition-colors">About</a></li>
            <li><a href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-white/50">
          © {year} Parallax Research Group. Independent research; not investment advice.
        </div>
      </div>
    </footer>
  );
}
