import team1 from "../assets/team1.webp";
import team2 from "../assets/team2.webp";
import team3 from "../assets/team3.webp";
import useTilt from "../hooks/useTilt";

const MEMBERS = [
  {
    img: team1,
    name: "Apoorva Subbanna",
    role: "Founder & Creative Head",
    bio: "A painter and art writer with a Masters in Visual Arts, awarded the HRD scholarship by the Government of India. Former visiting faculty at NIFT Delhi, she believes art has the potential to touch lives and transform the world.",
  },
  {
    img: team2,
    name: "Seema Subbanna",
    role: "Curator & Advisor",
    bio: "Trained as a designer, she ran one of Delhi's most prominent art galleries and was awarded a Charles Wallace Fellowship attached with The British Museum, V&A and the National Gallery, London. Many artists got their first break with her.",
  },
  {
    img: team3,
    name: "Dhruv Saklani",
    role: "Business Development Head",
    bio: "An MBA from the University of Edinburgh with a focus on strategy and negotiation. With diverse experience across financial services, healthcare and trading, he believes growth is only real when everyone is winning.",
  },
];

function MemberCard({ m, delay }) {
  const tilt = useTilt(8);
  return (
    <article data-reveal="up" data-delay={delay} className="group">
      <div
        ref={tilt}
        className="tilt-3d relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink/10 bg-graphite-900"
      >
        <img
          src={m.img}
          alt={`${m.name}, ${m.role}`}
          width="544"
          height="680"
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-ink/90 to-transparent p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-body text-sm leading-relaxed text-canvas">{m.bio}</p>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
          {m.name}
        </h3>
        <p className="mt-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-vermilion">
          <span className="h-1.5 w-1.5 rounded-full bg-vermilion" />
          {m.role}
        </p>
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-16 md:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p
              data-reveal="up"
              className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-vermilion"
            >
              <span className="h-px w-10 bg-vermilion" />
              Our Team
            </p>
            <h2 className="mask-line font-display text-4xl font-bold leading-tight tracking-tight text-ink text-balance md:text-6xl">
              <span className="mask-inner">
                A family that understands art from every angle.
              </span>
            </h2>
          </div>
          <p
            data-reveal="up"
            data-delay="120"
            className="max-w-xs font-body text-graphite-900/80"
          >
            Artists, curators, critics, buyers and advisors — a rare 360° view of the
            art world, under one roof.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {MEMBERS.map((m, i) => (
            <MemberCard key={m.name} m={m} delay={i * 130} />
          ))}
        </div>
      </div>
    </section>
  );
}
