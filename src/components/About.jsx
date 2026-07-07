import aboutImg from "../assets/about.webp";
import Counter from "./Counter";
import useTilt from "../hooks/useTilt";

const STATS = [
  { to: 70, suffix: "+", label: "Years of combined experience across practice, curation and the market" },
  { to: 300, suffix: "+", label: "Artists across South Asia" },
  { to: 15, suffix: "+", label: "Programmes across South Asia and United Kingdom" },
];

export default function About() {
  const tilt = useTilt(6);

  return (
    <section id="about" className="relative py-16 md:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div
            data-reveal="left"
            className="relative order-2 mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:order-1 lg:mx-0 lg:self-start"
          >
            <div
              ref={tilt}
              className="tilt-3d aspect-[4/5] overflow-hidden rounded-2xl border border-ink/10 shadow-xl shadow-ink/5"
            >
              <img
                src={aboutImg}
                alt="Art for Unity branded cards and identity"
                width="1400"
                height="1227"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden animate-float rounded-xl bg-vermilion px-6 py-5 text-canvas shadow-xl md:block">
              <p className="font-display text-3xl font-bold leading-none">A4U</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em]">
                Bringing people together
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <p
              data-reveal="up"
              className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-vermilion"
            >
              <span className="h-px w-10 bg-vermilion" />
              About Us
            </p>
            <h2 className="mask-line font-display text-4xl font-bold leading-tight tracking-tight text-ink text-balance md:text-5xl">
              <span className="mask-inner">
                “Art has never been neutral.”
              </span>
            </h2>
            <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-graphite-900/90 md:text-lg">
              <p data-reveal="up" data-delay="80">
                Art has never been neutral. Every work carries the weight of who made it,
                where, and under what conditions it was seen, collected and understood.
                For decades, the frameworks through which South Asian art entered global
                conversations were built by others, presented on terms that were rarely
                its own. The result was representation without authorship. Visibility
                without voice.
              </p>
              <p data-reveal="up" data-delay="160">
                Art for Unity was founded on the belief that this needs to change, and
                that changing it requires more than good intentions. It requires building
                the conditions through which artists, organisations and institutions can
                lead cultural conversations rather than simply participate in them. We
                are an independent curatorial platform, founded across South Asia and the
                UK, working at the intersection of practice, education, collaboration and
                exchange.
              </p>
              <p data-reveal="up" data-delay="240">
                What we do is both simple and structural. We work with contemporary
                artists across South Asia to create the spaces, programmes and
                partnerships through which their work is encountered on its own terms. We
                collaborate with institutions, galleries and organisations globally to
                build relationships that go beyond single transactions or tokenistic
                inclusion. We design education programmes that use art as a tool for
                understanding people, histories and ideas. And we bridge the distance
                between art and the audiences it was always meant to reach, including
                those who have never thought of themselves as collectors, students or
                participants in the art world.
              </p>
              <p data-reveal="up" data-delay="320">
                The question we began with was not what South Asian art is. It was who
                gets to decide. Everything we build is an answer to that.
              </p>
            </div>

            <p
              data-reveal="up"
              data-delay="220"
              className="mt-6 font-mono text-sm text-graphite-900"
            >
              Apoorva Subbanna, <span className="text-ink">Founder</span>
            </p>

            {/* Stats */}
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {STATS.map((s, i) => (
                <div key={s.label} data-reveal="up" data-delay={i * 120}>
                  <dt className="font-display text-3xl font-bold text-ink md:text-4xl">
                    <Counter to={s.to} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-1 font-body text-xs leading-snug text-graphite-900/80">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
