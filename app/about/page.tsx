import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import BrandMotif from "@/components/BrandMotif";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Parallax Research Group: our name, our research areas, and our founders.",
};

// Rotates through the site's palette so the three avatars aren't identical.
const AVATAR_COLORS = ["var(--color-navy)", "var(--color-teal)", "var(--color-blue)"];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const FOUNDERS = [
  {
    name: "Nirmay Thakkar",
    role: "Co-Founder, Markets",
    bio: "Nirmay is a co-founder of Parallax Research Group, where he writes about markets and the economy. He's drawn to figuring out what's really driving a market move versus the story everyone's telling about it. He's pursuing a double degree in Finance and Statistics at the University of Toronto and works in finance. Outside of markets, you'll usually find him on the tennis or basketball court, or cooking something new.",
  },
  {
    name: "Dwij Joshi",
    role: "Co-Founder, Technology",
    bio: "Dwij is a co-founder of Parallax Research Group, where he writes about technology, with a focus on AI infrastructure, hardware, and the engineering constraints that shape what actually gets built. He's a Mechatronics Engineering student at Toronto Metropolitan University, with hands-on experience building embedded systems and robotics projects. He's drawn to the gap between how technology gets marketed and how it's actually engineered underneath.",
  },
  {
    name: "Stealth",
    role: "Co-Founder, Stealth",
    bio: "Stealth",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden mx-auto max-w-3xl px-6 pt-16 pb-14 sm:pt-20">
        <BrandMotif className="pointer-events-none absolute right-[-60px] top-[-40px] hidden md:block w-[260px] h-[260px]" />
        <div className="relative">
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
        </div>
      </section>

      <section className="border-t border-[var(--color-line)]">
        <ScrollReveal className="mx-auto max-w-3xl px-6 py-14 grid sm:grid-cols-3 gap-10">
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
        </ScrollReveal>
      </section>

      <section className="border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <ScrollReveal>
            <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[var(--color-ink)]/70">
              Co-founders
            </h2>
          </ScrollReveal>
          <div className="mt-8 grid sm:grid-cols-3 gap-8">
            {FOUNDERS.map((founder, i) => (
              <ScrollReveal key={founder.name} delay={i * 100}>
                {/* Monogram avatar placeholder. Swap for a next/image
                    pointing at the founder's real headshot once photos
                    are ready, keep the same w-20 h-20 sizing. */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-lg font-semibold"
                  style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  aria-hidden="true"
                >
                  {getInitials(founder.name)}
                </div>
                <h3 className="mt-4 font-semibold">{founder.name}</h3>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">
                  {founder.role}
                </p>
                <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
                  {founder.bio}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
