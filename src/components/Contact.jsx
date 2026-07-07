import { lazy, Suspense, useState } from "react";

const SectionFlow = lazy(() => import("./SectionFlow"));

// --- Configure these with the client's real details ---------------------
const CONTACT_EMAIL = "hello@artforunity.com"; // TODO: client's real email
// Optional: paste a Formspree (or similar) endpoint to receive submissions in
// an inbox. Leave empty to fall back to opening the visitor's mail client.
const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxx"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", interest: "Curate", message: "" });
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
        setForm({ name: "", email: "", interest: "Curate", message: "" });
      } catch {
        setStatus("error");
      }
      return;
    }

    // Fallback: open the visitor's mail client pre-filled.
    const subject = encodeURIComponent(`Art for Unity enquiry, ${form.interest}`);
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
                Let&rsquo;s start a <span className="text-vermilion">conversation.</span>
              </span>
            </h2>
            <p className="mt-8 max-w-md font-body text-lg leading-relaxed text-canvas/80">
              Whether you are an artist, an institution, an educator or a collector,
              we would like to hear from you. Tell us what you are building, and we
              will tell you how we can be part of it.
            </p>
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
                  <option>Curate</option>
                  <option>Collaborate</option>
                  <option>Cultivate</option>
                  <option>Connect</option>
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
                  ? "Sent. Thank you."
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
                  "We've received your enquiry. We'll be in touch shortly."}
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
