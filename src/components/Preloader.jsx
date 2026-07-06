import { useEffect, useRef, useState } from "react";
import logoVideo from "../assets/logo-video.mp4";
import logoPoster from "../assets/logo.webp";

const BRAND = "ART FOR UNITY";

/**
 * Light-theme loading screen. The animated logo video plays centred and large,
 * keeping it the sole focus. No percentage — the reveal is timed to the logo
 * animation (or a graceful cap), then the whole screen lifts away like a curtain.
 */
export default function Preloader({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let done = false;
    const start = performance.now();

    const finish = () => {
      if (done) return;
      // hold a graceful minimum so the logo is actually seen
      const elapsed = performance.now() - start;
      if (elapsed < 1800) {
        setTimeout(finish, 1800 - elapsed);
        return;
      }
      done = true;
      setLeaving(true);
      setTimeout(() => onDone?.(), 1000);
    };

    if (reduce) {
      const t = setTimeout(finish, 600);
      return () => clearTimeout(t);
    }

    const video = videoRef.current;
    video?.play?.().catch(() => {});
    video?.addEventListener("ended", finish);

    // Cap so a long/blocked video never strands the visitor.
    const cap = setTimeout(finish, 3400);

    return () => {
      clearTimeout(cap);
      video?.removeEventListener("ended", finish);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-white transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
      role="status"
      aria-label="Loading Art for Unity"
    >
      {/* Center content */}
      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center px-6 transition-all duration-500 ${
          leaving ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Logo video */}
        <div className="animate-logo-in relative h-72 w-72 overflow-hidden rounded-[1.75rem] bg-transparent md:h-96 md:w-96">
          <video
            ref={videoRef}
            src={logoVideo}
            poster={logoPoster}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            aria-label="Art for Unity animated logo"
          />
        </div>

        {/* Brand name — letters rise */}
        <div className="mt-9 flex overflow-hidden">
          {BRAND.split("").map((ch, i) => (
            <span
              key={i}
              className="animate-letter-up inline-block font-display text-base font-semibold uppercase tracking-[0.42em] text-ink md:text-lg"
              style={{ animationDelay: `${250 + i * 45}ms` }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </div>

        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.4em] text-graphite-900/50">
          South Asian art, on its own terms.
        </p>

        {/* Minimal loading pulse — no numbers */}
        <div className="mt-8 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-vermilion"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
