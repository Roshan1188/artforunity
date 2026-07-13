import { useEffect } from "react";

/**
 * Scroll-reveal orchestrator. Watches every `.reveal`, `[data-reveal]` and
 * `.mask-line` element and toggles `is-visible` when it enters the viewport.
 *
 * Stagger: add `data-delay="120"` (ms) to any element and its transition is
 * offset by that amount — great for animating lists/cards in sequence.
 *
 * Uses a MutationObserver so elements added AFTER mount (e.g. gallery items
 * re-rendered by a filter change) are also observed — otherwise they would
 * stay at opacity: 0 forever.
 *
 * Honours prefers-reduced-motion (CSS reveals everything; the observer simply
 * has nothing to animate).
 */
const SELECTOR = ".reveal, [data-reveal], .mask-line";

export default function useReveal() {
  useEffect(() => {
    const prep = (el) => {
      const d = el.getAttribute("data-delay");
      if (d) {
        el.style.transitionDelay = `${d}ms`;
        const inner = el.querySelector(".mask-inner");
        if (inner) inner.style.transitionDelay = `${d}ms`;
      }
    };

    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll(SELECTOR)
        .forEach((el) => el.classList.add("is-visible"));
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

    // Bind an element (once) to the intersection observer.
    const bind = (el) => {
      if (el.dataset.revealBound) return;
      el.dataset.revealBound = "1";
      prep(el);
      observer.observe(el);
    };

    // Scan a subtree for reveal elements (including the root itself).
    const scan = (root) => {
      if (root.matches && root.matches(SELECTOR)) bind(root);
      if (root.querySelectorAll) root.querySelectorAll(SELECTOR).forEach(bind);
    };

    scan(document.body);

    // Watch for elements added after mount (filtered lists, lazy content…).
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) scan(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);
}
