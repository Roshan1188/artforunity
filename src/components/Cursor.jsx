import { useEffect, useRef } from "react";

/**
 * Custom art-gallery cursor: a single solid black dot that tracks the
 * pointer directly (no lag) and stays a fixed size and colour at all times.
 * Only activates on real hover (pointer) devices — touch keeps native input.
 */
export default function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current;

    const move = (e) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener("pointermove", move);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
