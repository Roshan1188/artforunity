import { lazy, Suspense } from "react";
import useTilt from "../hooks/useTilt";

const SectionFlow = lazy(() => import("./SectionFlow"));

const CATEGORIES = [
  {
    no: "01",
    title: "Art Education",
    tagline: "Art as a tool for understanding & self-discovery",
    body: "Comprehending art means understanding people, cultures, history and society. Through specially designed modules and programs, we use the visual language to explore historical, spiritual, environmental, social and political ideas — and to help people of all ages express themselves without pressure or prejudice.",
    points: [
      "Bespoke modules & programs",
      "For all age groups & sectors",
      "Problem-solving at micro & macro level",
    ],
  },
  {
    no: "02",
    title: "Art Dealing",
    tagline: "The safest long-term investment, when you buy correctly",
    body: "The global art industry is worth ~$65 billion annually. With decades of hard-earned expertise, we don't just advise which artists to buy — we identify the works that are safest to invest in. We bring authenticity, integrity and credibility, understanding the market as artists, critics, curators, buyers and investment advisors.",
    points: [
      "Access to 300+ artists",
      "Investment-grade advisory",
      "Every budget catered for",
    ],
  },
];

function CategoryCard({ c, delay }) {
  const tilt = useTilt(7);
  return (
    <article
      ref={tilt}
      data-reveal="up"
      data-delay={delay}
      className="tilt-3d group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-vermilion/60 md:p-10"
    >
      <span className="font-mono text-sm text-vermilion">{c.no}</span>
      <h3 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
        {c.title}
      </h3>
      <p className="mt-2 font-body text-sm font-medium uppercase tracking-wide text-canvas/60">
        {c.tagline}
      </p>
      <p className="mt-6 font-body leading-relaxed text-canvas/80">{c.body}</p>

      <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
        {c.points.map((p) => (
          <li
            key={p}
            className="flex items-center gap-3 font-body text-sm text-canvas/90"
          >
            <svg
              className="h-4 w-4 shrink-0 text-vermilion"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {p}
          </li>
        ))}
      </ul>

      {/* Decorative dot */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-vermilion/0 blur-2xl transition-colors duration-500 group-hover:bg-vermilion/20" />
    </article>
  );
}

export default function Categories() {
  return (
    <section
      id="categories"
      className="relative isolate overflow-hidden bg-graphite-950 py-24 text-canvas md:py-32"
    >
      <Suspense fallback={null}>
        <SectionFlow />
      </Suspense>
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p
            data-reveal="up"
            className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-vermilion"
          >
            <span className="h-px w-10 bg-vermilion" />
            What We Do
          </p>
          <h2 className="mask-line font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
            <span className="mask-inner">Two ways we put art to work.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={c.no} c={c} delay={i * 140} />
          ))}
        </div>
      </div>
    </section>
  );
}
