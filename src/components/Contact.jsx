import { lazy, Suspense, useState } from "react";

const SectionFlow = lazy(() => import("./SectionFlow"));

// --- Configure these with the client's real details ---------------------
const CONTACT_EMAIL = "hello@artforunity.com"; // TODO: client's real email
const WHATSAPP_NUMBER = "910000000000"; // TODO: client's real number (intl, no +)
// Optional: paste a Formspree (or similar) endpoint to receive submissions in
// an inbox. Leave empty to fall back to opening the visitor's mail client.
const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxx"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", interest: "Art Education", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();

    // If a real endpoint is configured, submit straight to the inbox.
    if (FORM_ENDPOINT) {
      try {
        setStatus("sending");
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(e.target),
        });
        if (!res.ok) throw new Error("bad response");
        setStatus("sent");
        setForm({ name: "", email: "", interest: "Art Education", message: "" });
      } catch {
        setStatus("error");
      }
      return;
    }

    // Fallback: open the visitor's mail client pre-filled.
    const subject = encodeURIComponent(`Art for Unity enquiry — ${form.interest}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nInterested in: ${form.interest}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-graphite-950 py-24 text-canvas md:py-32"
    >
      <Suspense fallback={null}>
        <SectionFlow />
      </Suspense>
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: invitation */}
          <div data-reveal="left">
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-vermilion">
              <span className="h-px w-10 bg-vermilion" />
              Contact
            </p>
            <h2 className="mask-line font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
              <span className="mask-inner">
                Let's build something with{" "}
                <span className="text-vermilion">art.</span>
              </span>
            </h2>
            <p className="mt-8 max-w-md font-body text-lg leading-relaxed text-canvas/80">
              Whether you want to learn, curate, or invest — tell us what you have in
              mind. We cater to every art requirement an individual may have.
            </p>

            <div className="mt-12 space-y-6">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-4 font-body text-canvas/90 transition-colors hover:text-vermilion"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-vermilion">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                {CONTACT_EMAIL}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 font-body text-canvas/90 transition-colors hover:text-vermilion"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-vermilion">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24Zm4.52 10.34c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14 0-.31-.02-.47-.02-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
                  </svg>
                </span>
                WhatsApp us
              </a>
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={onSubmit}
            data-reveal="right"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-9"
          >
            <div className="grid gap-5">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-canvas/60">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={update}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 font-body text-canvas placeholder:text-canvas/30 focus:border-vermilion focus:outline-none focus:ring-1 focus:ring-vermilion"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-canvas/60">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update}
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 font-body text-canvas placeholder:text-canvas/30 focus:border-vermilion focus:outline-none focus:ring-1 focus:ring-vermilion"
                />
              </div>
              <div>
                <label htmlFor="interest" className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-canvas/60">
                  I'm interested in
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={form.interest}
                  onChange={update}
                  className="w-full cursor-pointer rounded-lg border border-white/15 bg-graphite-950 px-4 py-3 font-body text-canvas focus:border-vermilion focus:outline-none focus:ring-1 focus:ring-vermilion"
                >
                  <option>Art Education</option>
                  <option>Art Dealing / Investment</option>
                  <option>Curation & Advisory</option>
                  <option>Something else</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-canvas/60">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={form.message}
                  onChange={update}
                  placeholder="Tell us a little about what you're looking for…"
                  className="w-full resize-none rounded-lg border border-white/15 bg-transparent px-4 py-3 font-body text-canvas placeholder:text-canvas/30 focus:border-vermilion focus:outline-none focus:ring-1 focus:ring-vermilion"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-2 inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-vermilion px-7 py-4 font-display font-medium text-white transition-colors duration-200 hover:bg-white hover:text-ink disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending"
                  ? "Sending…"
                  : status === "sent"
                  ? "Sent — thank you"
                  : "Send enquiry"}
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p
                aria-live="polite"
                className={`text-center font-mono text-xs ${
                  status === "error" ? "text-vermilion" : "text-canvas/60"
                }`}
              >
                {status === "sent" &&
                  "We've received your enquiry — we'll be in touch shortly."}
                {status === "error" &&
                  "Something went wrong. Please email us directly."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
