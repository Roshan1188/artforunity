const WORDS = ["Curate", "Collaborate", "Connect", "Cultivate"];

function Row({ reverse = false }) {
  const row = [...WORDS, ...WORDS];
  return (
    <div
      className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap group-hover:[animation-play-state:paused]"
      style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      {row.map((w, i) => (
        <span key={i} className="flex items-center gap-10">
          <span
            className={`font-display text-2xl font-medium uppercase tracking-tight md:text-4xl ${
              reverse ? "text-canvas/40" : "text-canvas"
            }`}
          >
            {w}
          </span>
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-vermilion" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="group flex flex-col gap-4 overflow-hidden border-y border-ink/10 bg-ink py-6 text-canvas">
      <Row />
      <Row reverse />
    </div>
  );
}
