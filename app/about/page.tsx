import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Parallax Research Group: our name, our research areas, and our founders.",
};

const FOUNDERS = [
  {
    name: "Founder Name One",
    role: "Co-Founder, Markets",
    bio: "Placeholder bio. Replace with a short background: relevant experience, focus areas, and what drew them to independent research.",
  },
  {
    name: "Founder Name Two",
    role: "Co-Founder, Technology",
    bio: "Placeholder bio. Replace with a short background: relevant experience, focus areas, and what drew them to independent research.",
  },
  {
    name: "Founder Name Three",
    role: "Co-Founder, Operations",
    bio: "Placeholder bio. Replace with a short background: relevant experience, focus areas, and what drew them to independent research.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-14 sm:pt-20">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-teal)]">
          About
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
          The view depends on where you stand.
        </h1>

        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-[var(--color-ink)]">
          <p>
            Parallax is the apparent shift in an object's position when it's
            viewed from two different vantage points, the same principle that
            lets astronomers measure distances to stars and lets a person
            triangulate distance just by moving their head. Nothing about the
            object changes. Only the angle does, and that's often enough to
            see it more clearly.
          </p>
          <p>
            That's the premise of this group. We publish independent,
            data-driven research on markets and technology, and we try to hold
            more than one vantage point at once rather than defaulting to
            whichever narrative is loudest that week.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-3xl px-6 py-14 grid sm:grid-cols-3 gap-10">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-navy)]">
              Markets
            </h2>
            <p className="mt-3 text-[15px] text-[var(--color-muted)] leading-relaxed">
              Coverage of rates, credit, and macro positioning, with an
              emphasis on distinguishing what a data point is actually pricing
              from the narrative attached to it.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-teal)]">
              Technology
            </h2>
            <p className="mt-3 text-[15px] text-[var(--color-muted)] leading-relaxed">
              Coverage of AI infrastructure, hardware supply chains, and
              systems-level constraints that shape what gets built, well
              upstream of the product announcements.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-blue)]">
              Company Research
            </h2>
            <p className="mt-3 text-[15px] text-[var(--color-muted)] leading-relaxed">
              Deep dives on individual companies, business model, competitive
              position, and unit economics, as a complement to our broader
              Markets and Technology coverage.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-ink)]/70">
            Co-founders
          </h2>
          <div className="mt-8 grid sm:grid-cols-3 gap-8">
            {FOUNDERS.map((founder) => (
              <div key={founder.name}>
                {/* Placeholder photo slot. Replace the div below with a
                    next/image pointing at the founder's real headshot. */}
                <div
                  className="w-20 h-20 border border-dashed border-[var(--color-line)] flex items-center justify-center text-[10px] text-[var(--color-muted)] uppercase tracking-wide"
                  aria-hidden="true"
                >
                  Photo
                </div>
                <h3 className="mt-4 font-semibold">{founder.name}</h3>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">
                  {founder.role}
                </p>
                <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
                  {founder.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
