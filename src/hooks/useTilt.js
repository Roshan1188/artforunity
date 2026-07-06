import { useEffect, useRef } from "react";

/**
 * Pointer-driven 3D tilt. Attach the returned ref to any element; it rotates
 * toward the cursor and eases back on leave. No-ops under reduced-motion or on
 * touch (no hover). `max` = peak rotation in degrees.
 */
export default function useTilt(max = 9) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let rect = null;

    const enter = () => {
      rect = el.getBoundingClientRect();
      el.style.transition = "transform 0.12s ease-out";
    };
    const move = (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateX(${-y * max}deg) rotateY(${
        x * max
      }deg) scale(1.015)`;
    };
    const leave = () => {
      el.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);

  return ref;
}
