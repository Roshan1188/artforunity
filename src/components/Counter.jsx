import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 → `to` once it scrolls into view (eased). Renders an optional
 * prefix/suffix (e.g. "+", "%"). Respects reduced-motion by showing the final
 * value immediately.
 */
export default function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1700,
  className = "",
}) {
  const ref = useRef(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [val, setVal] = useState(() => (reduced ? to : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf = 0;
    let start = null;
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const tick = (ts) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setVal(Math.round(ease(p) * to));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}
