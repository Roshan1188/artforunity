import { useEffect, useRef } from "react";

/**
 * Custom art-gallery cursor: a single dot that tracks the pointer directly
 * (no lag) and keeps a fixed size at all times. Over elements tagged with
 * data-cursor-text, a small word label follows the dot instead of resizing
 * it. Only activates on real hover (pointer) devices — touch keeps native
 * input.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current;
    const label = labelRef.current;

    const move = (e) => {
      const pos = `translate(${e.clientX}px, ${e.clientY}px)`;
      dot.style.transform = pos;
      label.style.transform = pos;
    };
    const over = (e) => {
      const target = e.target.closest("[data-cursor-text]");
      if (!target) return;
      label.textContent = target.getAttribute("data-cursor-text");
      label.classList.add("cursor-label--active");
    };
    const out = (e) => {
      if (e.target.closest("[data-cursor-text]")) {
        label.classList.remove("cursor-label--active");
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerout", out);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true" />
    </>
  );
}
