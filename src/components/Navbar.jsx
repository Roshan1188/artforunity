import { useEffect, useState } from "react";
import logo from "../assets/logo.webp";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "What We Do", href: "#categories" },
  { label: "Works", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in the viewport's middle band.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between">
        <a href="#home" className="flex items-center gap-3" aria-label="Art for Unity home">
          <img src={logo} alt="Art for Unity logo" width="56" height="56" fetchPriority="high" decoding="async" className="h-14 w-14 object-contain rounded-lg" />
          <span className="font-mono text-sm font-medium uppercase tracking-[0.25em] text-ink">
            Art for Unity
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`group relative font-display text-sm font-medium transition-colors duration-200 hover:text-ink ${
                    isActive ? "text-ink" : "text-graphite-900"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-vermilion transition-all duration-300 group-hover:w-full ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className="hidden cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-display text-sm font-medium text-canvas transition-colors duration-200 hover:bg-vermilion md:inline-flex"
        >
          Enquire
          <span className="h-1.5 w-1.5 rounded-full bg-vermilion transition-colors duration-200 group-hover:bg-white" />
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-ink transition-all duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-all duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-ink/10 bg-white/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="container-px flex flex-col gap-1 py-4">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 55}ms` : "0ms" }}
                className={`block cursor-pointer py-3 font-display text-lg font-medium text-graphite-900 transition-all duration-300 hover:text-vermilion ${
                  open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block cursor-pointer rounded-full bg-ink py-3 text-center font-display font-medium text-canvas"
            >
              Enquire
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
