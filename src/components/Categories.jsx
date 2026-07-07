import { lazy, Suspense } from "react";
import useTilt from "../hooks/useTilt";

const SectionFlow = lazy(() => import("./SectionFlow"));

const CATEGORIES = [
  {
    no: "01",
    title: "Curate",
    tagline: "Exhibitions, presentations and artist platforms",
    body: "Curation is not simply selection. It is the act of creating the conditions under which a work is encountered, understood and remembered. We build exhibitions and presentations that place South Asian contemporary art in conversation with the world, while platforming the artists whose voices have historically been mediated by others. Every curatorial decision we make begins with the same question: whose terms is this work being seen on?",
  },
  {
    no: "02",
    title: "Collaborate",
    tagline: "Partnerships with institutions and organisations",
    body: "We work with galleries, museums and cultural organisations across South Asia and the UK to build relationships that are genuinely reciprocal. Our collaborations go beyond single exhibitions or tokenistic inclusion. They are long-term curatorial propositions built around shared values, mutual exchange and a commitment to expanding where and how South Asian art is encountered globally.",
  },
  {
    no: "03",
    title: "Cultivate",
    tagline: "Climate action, education, access and other global conversations",
    body: "We design programmes that use art as a language for understanding people, histories and ideas. At the individual level, this means bespoke education programmes across age groups and sectors that make art feel immediate rather than intimidating. At the collective level, it means using South Asian contemporary art as a lens through which to engage with the global challenges that define our moment: climate action, access, equity and belonging. Art, we believe, makes the abstract human.",
  },
  {
    no: "04",
    title: "Connect",
    tagline: "Bridging the gap between art and the audiences",
    body: "We bring artists, works and audiences together in ways that are considered rather than transactional. For individuals and organisations looking to build a meaningful relationship with South Asian art, we offer advisory and acquisition support grounded in curatorial knowledge, provenance research and authentication. What you collect should carry meaning as well as value, and we ensure it does both.",
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
            <span className="mask-inner">Four ways we translate intention into practice.</span>
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
