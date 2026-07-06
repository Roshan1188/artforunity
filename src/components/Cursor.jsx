import { useEffect, useRef } from "react";

/**
 * Custom art-gallery cursor: a single dot that tracks the pointer directly
 * (no lag) and scales up over interactive elements. Uses mix-blend-mode so
 * it reads on light and dark. Only activates on real hover (pointer)
 * devices — touch keeps native input.
 */
export default function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current;

    const move = (e) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const over = (e) => {
      if (e.target.closest("a, button, [data-cursor], input, textarea, select"))
        dot.classList.add("cursor-dot--active");
    };
    const out = (e) => {
      if (e.target.closest("a, button, [data-cursor], input, textarea, select"))
        dot.classList.remove("cursor-dot--active");
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

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
