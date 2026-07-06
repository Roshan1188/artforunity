import { useEffect, useState } from "react";
import ArtPiece from "./ArtPiece";
import RippleImage from "./RippleImage";
import { buildArtSvg } from "../lib/buildArtSvg";

/**
 * Curated works gallery — filterable grid of pieces with a zoom lightbox.
 * Pieces are generative placeholders (see ArtPiece); swap with real artwork
 * by giving each entry an image and rendering an <img> instead of <ArtPiece>.
 */
const WORKS = [
  { id: 1, title: "Crimson Confluence", artist: "Apoorva Subbanna", year: "2024", medium: "Acrylic on canvas", cat: "Abstract", palette: ["#1b1b1f", "#3a1410", "#E0241B", "#7a1610", "#f4d9c8"] },
  { id: 2, title: "Monsoon Letters", artist: "R. Venkataraman", year: "2023", medium: "Oil on linen", cat: "Landscape", palette: ["#0e2230", "#16404f", "#2f9e9e", "#d8b15a", "#eef0e8"] },
  { id: 3, title: "Untitled (Self)", artist: "Meher Kaur", year: "2024", medium: "Charcoal & gold leaf", cat: "Portrait", palette: ["#1a1714", "#2e2620", "#caa14a", "#7c5a2a", "#efe7d6"] },
  { id: 4, title: "Quiet Riot", artist: "D. Saklani", year: "2022", medium: "Mixed media", cat: "Abstract", palette: ["#14121c", "#2a1840", "#7b4bd1", "#E0241B", "#e9e2f2"] },
  { id: 5, title: "Coastline Study", artist: "Seema Subbanna", year: "2023", medium: "Watercolour", cat: "Landscape", palette: ["#16241a", "#1f3b2a", "#5fa86a", "#d8c27a", "#eef2ea"] },
  { id: 6, title: "Ochre Hours", artist: "Imran Q.", year: "2024", medium: "Pigment on paper", cat: "Contemporary", palette: ["#2a1408", "#4a2410", "#d2762a", "#8a2d18", "#f2e3d2"] },
  { id: 7, title: "The Listener", artist: "Meher Kaur", year: "2023", medium: "Oil on canvas", cat: "Portrait", palette: ["#181a20", "#22303a", "#4a7fa3", "#c2483c", "#e8edf0"] },
  { id: 8, title: "Field of Vermilion", artist: "Apoorva Subbanna", year: "2024", medium: "Acrylic & ink", cat: "Contemporary", palette: ["#1b1410", "#3a1a14", "#E0241B", "#caa14a", "#f3e6d8"] },
];

const FILTERS = ["All", "Abstract", "Landscape", "Portrait", "Contemporary"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const shown = WORKS.filter((w) => filter === "All" || w.cat === filter);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <section id="gallery" className="relative py-16 md:py-24">
      <div className="container-px mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p
              data-reveal="up"
              className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-vermilion"
            >
              <span className="h-px w-10 bg-vermilion" />
              Selected Works
            </p>
            <h2 className="mask-line font-display text-4xl font-bold leading-tight tracking-tight text-ink text-balance md:text-6xl">
              <span className="mask-inner">A curated wall of art.</span>
            </h2>
          </div>
          <p
            data-reveal="up"
            data-delay="120"
            className="max-w-xs font-body text-graphite-900/80"
          >
            A glimpse from our network of 300+ artists — across abstraction,
            landscape, portraiture and the contemporary.
          </p>
        </div>

        {/* Filters */}
        <div data-reveal="up" className="mb-10 flex flex-wrap gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${
                filter === f
                  ? "border-ink bg-ink text-canvas"
                  : "border-ink/15 text-graphite-900 hover:border-ink/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {shown.map((w, i) => (
            <button
              key={w.id}
              data-reveal="scale"
              data-delay={(i % 4) * 90}
              data-cursor
              onClick={() => setActive(w)}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-ink/10 bg-graphite-900 text-left"
              aria-label={`View ${w.title} by ${w.artist}`}
            >
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                <ArtPiece seed={w.id * 1337 + 7} palette={w.palette} />
              </div>
              {/* Cinematic hover overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="translate-y-3 font-display text-base font-bold text-canvas transition-transform duration-300 group-hover:translate-y-0">
                  {w.title}
                </p>
                <p className="translate-y-3 font-mono text-[10px] uppercase tracking-[0.15em] text-canvas/70 transition-transform delay-75 duration-300 group-hover:translate-y-0">
                  {w.artist} · {w.year}
                </p>
              </div>
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg className="h-4 w-4 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-5 backdrop-blur-md"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} by ${active.artist}`}
        >
          <div
            className="relative grid max-h-[88vh] w-full max-w-4xl animate-fade-up overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-[1.3fr_1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/5] bg-graphite-900">
              <RippleImage svg={buildArtSvg(active.id * 1337 + 7, active.palette)} />
            </div>
            <div className="flex flex-col justify-center gap-3 p-8 md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-vermilion">
                {active.cat}
              </p>
              <h3 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                {active.title}
              </h3>
              <p className="font-body text-graphite-900">
                {active.artist} · {active.year}
              </p>
              <p className="font-mono text-sm text-graphite-900/70">{active.medium}</p>
              <a
                href="#contact"
                onClick={() => setActive(null)}
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-medium text-canvas transition-colors hover:bg-vermilion"
              >
                Enquire about this work
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink/80 text-canvas transition-colors hover:bg-vermilion"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
