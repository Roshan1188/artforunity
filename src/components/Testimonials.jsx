// Representative testimonials — replace with real client quotes when available.
const QUOTES = [
  {
    quote:
      "I bought my first painting through Art for Unity with total confidence. They explained the provenance, the artist, the market — nothing was hidden. It now means more to me than its value.",
    name: "Ananya R.",
    role: "First-time collector",
  },
  {
    quote:
      "Their education program changed how my students see the world. Art stopped being intimidating and became a language they could speak.",
    name: "Prof. Mehta",
    role: "Educator, Delhi",
  },
  {
    quote:
      "Rigorous, honest, and deeply knowledgeable about the market. The only advisors I trust to tell me when not to buy.",
    name: "S. Kapoor",
    role: "Private investor",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-16 md:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p
            data-reveal="up"
            className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-vermilion"
          >
            <span className="h-px w-10 bg-vermilion" />
            In Their Words
          </p>
          <h2 className="mask-line font-display text-4xl font-bold leading-tight tracking-tight text-ink text-balance md:text-6xl">
            <span className="mask-inner">Trusted, the human way.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <figure
              key={q.name}
              data-reveal="up"
              data-delay={i * 130}
              className="group flex flex-col rounded-2xl border border-ink/10 bg-white/60 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-vermilion/50"
            >
              <span className="font-display text-5xl leading-none text-vermilion/30 transition-colors duration-300 group-hover:text-vermilion/60">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 font-body text-base leading-relaxed text-graphite-900/90">
                {q.quote}
              </blockquote>
              <figcaption className="mt-7 border-t border-ink/10 pt-5">
                <p className="font-display font-bold text-ink">{q.name}</p>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-vermilion">
                  {q.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
