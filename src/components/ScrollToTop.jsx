import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={toTop}
      aria-label="Scroll back to top"
      className={`group fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-ink text-canvas shadow-lg shadow-ink/25 transition-all duration-300 hover:bg-vermilion focus:outline-none focus:ring-2 focus:ring-vermilion focus:ring-offset-2 focus:ring-offset-canvas md:bottom-8 md:right-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      >
        <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
