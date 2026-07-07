import { useState } from "react";
import logo from "../assets/logo.webp";
import Partners from "./Partners";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "What We Do", href: "#categories" },
  { label: "Works", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

// TODO: point these at the client's real profiles.
const SOCIALS = [
  { label: "Instagram", href: "#", d: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .4 1.4.9.5.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.4 1-.9 1.4-.4.5-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.4-1.4-.9-.5-.4-.7-.8-.9-1.4-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.4-1 .9-1.4.4-.5.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.3-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm5-2.4a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" },
  { label: "LinkedIn", href: "#", d: "M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.4h3.28V20H3.3V8.4Zm5.55 0h3.14v1.58h.05c.44-.83 1.5-1.7 3.1-1.7 3.32 0 3.93 2.18 3.93 5.02V20h-3.28v-5.06c0-1.2-.02-2.76-1.68-2.76-1.68 0-1.94 1.31-1.94 2.67V20H8.85V8.4Z" },
  { label: "WhatsApp", href: "#", d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24Z" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // TODO: wire to a real provider (Mailchimp / Buttondown / Resend).
  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-white pt-16">
      <div className="container-px mx-auto max-w-7xl">
        {/* Newsletter + links */}
        <div className="grid gap-12 pb-14 md:grid-cols-2 md:gap-20">
          <div>
            <h3 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Let&rsquo;s stay connected.
            </h3>
            <p className="mt-3 max-w-md font-body text-graphite-900/80">
              A quarterly letter on artists, exhibitions and the ideas shaping South
              Asian contemporary art. Subscribe and we will come to you.
            </p>
            <form onSubmit={subscribe} className="mt-6 flex max-w-md gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
                className="w-full rounded-full border border-ink/15 bg-white/60 px-5 py-3 font-body text-ink placeholder:text-graphite-900/40 focus:border-vermilion focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-ink px-6 py-3 font-display text-sm font-medium text-canvas transition-colors hover:bg-vermilion"
              >
                {subscribed ? "Done ✓" : "Subscribe"}
              </button>
            </form>
            {subscribed && (
              <p className="mt-3 font-mono text-xs text-vermilion">
                Thanks, you're on the list.
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <nav className="flex flex-wrap gap-x-7 gap-y-3 md:justify-end">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-display text-sm font-medium text-graphite-900 transition-colors hover:text-vermilion"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-graphite-900 transition-colors hover:border-vermilion hover:bg-vermilion hover:text-canvas"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legacy: places that shaped the practice */}
        <Partners />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-ink/10 py-8 md:flex-row">
          <a href="#home" className="inline-flex items-center gap-3">
            <img
              src={logo}
              alt="Art for Unity logo"
              width="36"
              height="36"
              loading="lazy"
              decoding="async"
              className="h-9 w-9 object-contain"
            />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.25em]">
              Art for Unity
            </span>
          </a>
          <p className="font-mono text-xs text-graphite-900/70">
            © {new Date().getFullYear()} Art for Unity. All rights reserved.
          </p>
          <p className="flex items-center gap-2 font-mono text-xs text-graphite-900/70">
            Crafted with
            <span className="h-2 w-2 rounded-full bg-vermilion" />
            for art lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
