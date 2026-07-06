import { useEffect, useRef } from "react";

/**
 * Magnetic hover — the element drifts toward the cursor while hovered and
 * springs back on leave. Attach the returned ref. `strength` scales the pull.
 * No-ops under reduced-motion or on non-hover (touch) devices.
 */
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const leave = () => {
      el.style.transform = "translate(0px, 0px)";
    };

    el.style.transition = "transform 0.35s cubic-bezier(0.16,1,0.3,1)";
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return ref;
}
