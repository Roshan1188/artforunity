import { useEffect } from "react";

/**
 * Scroll-reveal orchestrator. Watches every `.reveal`, `[data-reveal]` and
 * `.mask-line` element and toggles `is-visible` when it enters the viewport.
 *
 * Stagger: add `data-delay="120"` (ms) to any element and its transition is
 * offset by that amount — great for animating lists/cards in sequence.
 *
 * Honours prefers-reduced-motion (CSS reveals everything; the observer simply
 * has nothing to animate).
 */
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(
      ".reveal, [data-reveal], .mask-line"
    );

    // Apply per-element stagger delay up front.
    els.forEach((el) => {
      const d = el.getAttribute("data-delay");
      if (d) {
        el.style.transitionDelay = `${d}ms`;
        const inner = el.querySelector(".mask-inner");
        if (inner) inner.style.transitionDelay = `${d}ms`;
      }
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
