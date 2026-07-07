import { useEffect, useState } from "react";

import feedbackArtists01 from "../assets/gallery/feedback-artists-01.jpg";
import feedback02 from "../assets/gallery/feedback-02.jpg";
import feedback03 from "../assets/gallery/feedback-03.jpg";
import feedback04 from "../assets/gallery/feedback-04.jpg";
import colorfables01 from "../assets/gallery/colorfables-01.jpg";
import feedback05 from "../assets/gallery/feedback-05.jpg";
import diasporicarchive01 from "../assets/gallery/diasporicarchive-01.jpg";
import manyfolds01 from "../assets/gallery/manyfolds-01.jpg";
import steponepause01 from "../assets/gallery/steponepause-01.jpg";
import steponepause02 from "../assets/gallery/steponepause-02.jpg";
import alliancefrancaise01 from "../assets/gallery/alliancefrancaise-01.png";
import alliancefrancaise02 from "../assets/gallery/alliancefrancaise-02.jpg";
import thinskinnedArtists01 from "../assets/gallery/thinskinned-artists-01.jpg";
import archive201401 from "../assets/gallery/archive-2014-01.jpg";
import manyfolds02 from "../assets/gallery/manyfolds-02.jpg";
import diasporicarchiveArtists01 from "../assets/gallery/diasporicarchive-artists-01.jpg";
import thinskinned01 from "../assets/gallery/thinskinned-01.jpg";
import thinskinned02 from "../assets/gallery/thinskinned-02.jpg";
import colorfables02 from "../assets/gallery/colorfables-02.jpg";

/**
 * Documented — real photography from Art for Unity's exhibitions, programmes
 * and events. Each entry carries: type, project name, venue, year.
 */
const WORKS = [
  { id: 1, img: feedbackArtists01, type: "Group photograph", project: "Feed Back", venue: "Royal College of Art x Artangel, London", year: "2025" },
  { id: 2, img: feedback02, type: "Exhibition view", project: "Feed Back", venue: "Royal College of Art x Artangel, London", year: "2025" },
  { id: 3, img: feedback03, type: "Exhibition view", project: "Feed Back", venue: "Royal College of Art x Artangel, London", year: "2025" },
  { id: 4, img: feedback04, type: "Exhibition view", project: "Feed Back", venue: "Royal College of Art x Artangel, London", year: "2025" },
  { id: 5, img: feedback05, type: "Exhibition view", project: "Feed Back", venue: "Royal College of Art x Artangel, London", year: "2025" },
  { id: 6, img: diasporicarchive01, type: "Exhibition view", project: "The Diasporic Archive", venue: "London", year: "2025" },
  { id: 7, img: diasporicarchiveArtists01, type: "Group photograph", project: "The Diasporic Archive", venue: "London", year: "2025" },
  { id: 8, img: thinskinnedArtists01, type: "Group photograph", project: "Thin Skinned: A fleur de peau", venue: "London", year: "2025" },
  { id: 9, img: thinskinned01, type: "Exhibition view", project: "Thin Skinned: A fleur de peau", venue: "London", year: "2025" },
  { id: 10, img: thinskinned02, type: "Exhibition view", project: "Thin Skinned: A fleur de peau", venue: "London", year: "2025" },
  { id: 11, img: steponepause01, type: "Programme", project: "Step One: Pause to Share", venue: "Goethe Institute, London", year: "2025" },
  { id: 12, img: steponepause02, type: "Programme", project: "Step One: Pause to Share", venue: "Goethe Institute, London", year: "2025" },
  { id: 13, img: colorfables01, type: "Installation view", project: "Color Fables", venue: "Museo Camera", year: "2023" },
  { id: 14, img: colorfables02, type: "Installation view", project: "Color Fables", venue: "Museo Camera, India", year: "2023" },
  { id: 15, img: manyfolds01, type: "Installation view", project: "Many Folds I", venue: "Museo Camera, Gurgaon", year: "2022" },
  { id: 16, img: manyfolds02, type: "Installation view", project: "Many Folds I", venue: "Museo Camera, Gurgaon", year: "2022" },
  { id: 17, img: alliancefrancaise01, type: "Event", project: "Archive", venue: "Alliance Française, Delhi", year: "2021" },
  { id: 18, img: alliancefrancaise02, type: "Event", project: "Archive", venue: "Alliance Française, Delhi", year: "2021" },
  { id: 19, img: archive201401, type: "Archive", project: "Archive", venue: "India", year: "2014" },
];

const FILTERS = [
  "All",
  "Feed Back",
  "The Diasporic Archive",
  "Thin Skinned: A fleur de peau",
  "Step One: Pause to Share",
  "Color Fables",
  "Many Folds I",
  "Archive",
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const shown = WORKS.filter((w) => filter === "All" || w.project === filter);

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
              Documented
            </p>
            <h2 className="mask-line font-display text-4xl font-bold leading-tight tracking-tight text-ink text-balance md:text-6xl">
              <span className="mask-inner">In practice&hellip;</span>
            </h2>
          </div>
          <p
            data-reveal="up"
            data-delay="120"
            className="max-w-xs font-body text-graphite-900/80"
          >
            A glimpse from our exhibitions, programmes and events across South
            Asia and the UK.
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

        {/* Grid — masonry columns so every photo shows uncropped at its own aspect ratio */}
        <div className="columns-2 gap-4 md:columns-3 md:gap-6 lg:columns-4">
          {shown.map((w, i) => (
            <button
              key={w.id}
              data-reveal="scale"
              data-delay={(i % 4) * 90}
              data-cursor
              onClick={() => setActive(w)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-ink/10 bg-graphite-900 text-left md:mb-6"
              aria-label={`View ${w.type}, ${w.project}, ${w.venue}, ${w.year}`}
            >
              <img
                src={w.img}
                alt={`${w.type}, ${w.project}, ${w.venue}, ${w.year}`}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Cinematic hover overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="translate-y-3 font-display text-base font-bold text-canvas transition-transform duration-300 group-hover:translate-y-0">
                  {w.project}
                </p>
                <p className="translate-y-3 font-mono text-[10px] uppercase tracking-[0.15em] text-canvas/70 transition-transform delay-75 duration-300 group-hover:translate-y-0">
                  {w.venue} · {w.year}
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
          aria-label={`${active.project}, ${active.venue}, ${active.year}`}
        >
          <div
            className="relative grid max-h-[88vh] w-full max-w-4xl animate-fade-up overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-[1.3fr_1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex max-h-[70vh] items-center justify-center bg-graphite-900 md:max-h-[88vh]">
              <img
                src={active.img}
                alt={`${active.type}, ${active.project}, ${active.venue}, ${active.year}`}
                className="max-h-[70vh] w-full object-contain md:max-h-[88vh]"
              />
            </div>
            <div className="flex flex-col justify-center gap-3 p-8 md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-vermilion">
                {active.type}
              </p>
              <h3 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                {active.project}
              </h3>
              <p className="font-body text-graphite-900">
                {active.venue} · {active.year}
              </p>
              <a
                href="#contact"
                onClick={() => setActive(null)}
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-medium text-canvas transition-colors hover:bg-vermilion"
              >
                Enquire about this project
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
