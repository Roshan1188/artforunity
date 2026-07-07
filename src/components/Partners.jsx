// Institutions associated with the team's experience (from their bios).
const PARTNERS = [
  "Royal College of Art, London, UK",
  "Goethe Institut, London, UK",
  "ArtAngel, London, UK",
  "The British Museum, London, UK",
  "Victoria and Albert Museum, London, UK",
  "National Portrait Gallery, London, UK",
  "Charles Wallace India Trust",
  "Ministry of Culture, Government of India",
  "National Institute of Fashion Technology, Delhi, India",
  "Lalit Kala Akademi, India",
  "Alliance Française, Delhi, India",
];

export default function Partners() {
  return (
    <section className="border-y border-ink/10 py-8 md:py-12">
      <div className="container-px mx-auto max-w-7xl">
        <p
          data-reveal="up"
          className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-graphite-900/60"
        >
          Places that shaped the practice.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
          {PARTNERS.map((p, i) => (
            <span
              key={p}
              data-reveal="up"
              data-delay={i * 70}
              className="font-display text-lg font-semibold text-graphite-900/55 transition-colors duration-300 hover:text-ink md:text-xl"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
