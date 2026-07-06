import { useEffect, useState } from "react";
import logoVideo from "../assets/logo-video.mp4";
import logoPoster from "../assets/logo.webp";
import useTilt from "../hooks/useTilt";
import useMagnetic from "../hooks/useMagnetic";

const ROTATING = ["language", "bridge", "platform"];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((p) => (p + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex overflow-hidden align-bottom text-vermilion">
      {/* invisible sizer keeps the line from jumping */}
      <span aria-hidden="true" className="invisible">
        {ROTATING.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
      <span
        key={i}
        className="animate-word-cycle absolute inset-0 whitespace-nowrap"
      >
        {ROTATING[i]}
      </span>
    </span>
  );
}

export default function Hero({ entered = false }) {
  const logoTilt = useTilt(10);
  const cta1 = useMagnetic(0.3);
  const cta2 = useMagnetic(0.25);

  // Stagger helper: each element animates up once the preloader has cleared.
  const step = (i) =>
    entered
      ? {
          className: "animate-fade-up",
          style: { animationDelay: `${i * 110}ms` },
        }
      : { className: "opacity-0" };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-start overflow-hidden bg-white pb-16 pt-28 md:pt-32 lg:items-center lg:pb-0 lg:pt-20"
    >
      <div className="container-px mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12">
        {/* Left: statement type */}
        <div className="lg:col-span-7">
          <p
            className={`mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-graphite-900 ${step(0).className}`}
            style={step(0).style}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-vermilion" />
            South Asian art, on its own terms.
          </p>

          <h1
            className={`font-display font-bold uppercase leading-[0.95] tracking-tightest text-ink text-balance text-[clamp(2rem,5.5vw,4rem)] ${step(1).className}`}
            style={step(1).style}
          >
            Art as a<br />
            <RotatingWord /> for
            <br />
            everyone.
          </h1>

          <p
            className={`mt-8 max-w-xl font-body text-lg leading-relaxed text-graphite-900/90 ${step(2).className}`}
            style={step(2).style}
          >
            Art for Unity builds spaces through which South Asian art is authored. We
            invite artists, organisations and institutions to lead and shape cultural
            conversations through lived experience.
          </p>

          <div
            className={`mt-10 flex flex-wrap items-center gap-4 ${step(3).className}`}
            style={step(3).style}
          >
            <a
              ref={cta1}
              href="#categories"
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-ink px-7 py-4 font-display font-medium text-canvas transition-colors duration-300 hover:bg-vermilion hover:shadow-xl hover:shadow-vermilion/25"
            >
              Explore what we do
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              ref={cta2}
              href="#about"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/20 px-7 py-4 font-display font-medium text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-canvas"
            >
              Our Practice
            </a>
          </div>
        </div>

        {/* Right: logo video panel — plays immediately, independent of the staggered fade-up */}
        <div className="lg:col-span-5">
          <div
            ref={logoTilt}
            className="tilt-3d group relative mx-auto aspect-square w-full max-w-md overflow-hidden"
          >
            <video
              src={logoVideo}
              poster={logoPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover mix-blend-multiply"
              aria-label="Art for Unity animated logo"
            />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite-900">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-ink to-transparent" />
      </div>
    </section>
  );
}
