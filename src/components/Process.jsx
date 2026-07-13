const STEPS = [
  {
    no: "01",
    title: "Listen",
    body: "Every engagement starts with understanding. Who you are, what you are building, and where South Asian art fits into that picture.",
    icon: "M12 3v18M3 12h18",
  },
  {
    no: "02",
    title: "Contextualise",
    body: "Seventy years of combined experience across practice, curation and the market. We place every conversation within a broader cultural context.",
    icon: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z M12 9a3 3 0 100 6 3 3 0 000-6Z",
  },
  {
    no: "03",
    title: "Create",
    body: "Whether an exhibition, a programme, a partnership or a collection — we collaborate, adapt and build.",
    icon: "M4 4h16v16H4z M4 9h16 M9 21V9",
  },
  {
    no: "04",
    title: "Nurture",
    body: "Our relationships don't end with the project. We are in it for the long term, because meaningful cultural exchange takes time.",
    icon: "M3 17l6-6 4 4 8-8 M14 7h7v7",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-16 md:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p
            data-reveal="up"
            className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-vermilion"
          >
            <span className="h-px w-10 bg-vermilion" />
            How It Works
          </p>
          <h2 className="mask-line font-display text-4xl font-bold leading-tight tracking-tight text-ink text-balance md:text-6xl">
            <span className="mask-inner">From conversation to collegiality.</span>
          </h2>
        </div>

        <div className="relative grid gap-x-6 gap-y-12 md:grid-cols-4">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-ink/10 md:block" />

          {STEPS.map((s, i) => (
            <div
              key={s.no}
              data-reveal="up"
              data-delay={i * 120}
              className="group relative"
            >
              <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-ink/15 bg-white transition-colors duration-300 group-hover:border-vermilion group-hover:bg-vermilion">
                <svg
                  className="h-6 w-6 text-ink transition-colors duration-300 group-hover:text-canvas"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={s.icon} />
                </svg>
              </div>
              <span className="font-mono text-xs text-vermilion">{s.no}</span>
              <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-graphite-900/80">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
