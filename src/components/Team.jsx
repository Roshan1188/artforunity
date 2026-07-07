import team1 from "../assets/apoorva.jpg";
import team2 from "../assets/team2.webp";
import team3 from "../assets/team3.webp";
import useTilt from "../hooks/useTilt";

const MEMBERS = [
  {
    img: team1,
    name: "Apoorva Subbanna",
    role: "Founder and Senior Curator",
    bio: "Founder and Senior Curator of Art for Unity, and the connective tissue between its practice and its purpose. A curator, artist and researcher with fifteen years of transnational experience across South Asia and the UK, her work is rooted in the belief that how art is presented is as political as what is presented. She holds an MA in Curating Contemporary Art from the Royal College of Art, London, and a background in Fine Arts from the University of Baroda and Delhi University. She was also awarded the Young Artists fellowship by the Cultural Ministry, the Government of India. Her curatorial projects span group exhibitions and institutional collaborations across London and India, with a practice that moves fluidly between making, writing and programming. A freelance writer and critic since 2009, she brings equal rigour to the exhibition floor and the page.",
  },
  {
    img: team2,
    name: "Seema Subbanna",
    role: "Advisor",
    bio: "An Art Consultant and Curator whose practice spans over twenty-five years across design, visual merchandising, gallery management and art advisory. Trained as a designer, her early career took her through the Festivals of India textile revival programme, with work exhibited across museums in France, America and Japan. A Charles Wallace India Trust Fellow, she worked with the British Museum, the Victoria and Albert Museum and the National Gallery, London, sharpening a lifelong understanding of how objects are displayed, contextualised and understood. She founded Gallery Ensign in Delhi and eventually transitioned to an independent practice as an art consultant and curator. A Senior Fellow of the Ministry of Culture, Government of India, her fluency across textiles, fine art, sculpture and installation brings a rare combination of experience and intelligence to every conversation at Art for Unity.",
  },
  {
    img: team3,
    name: "Dhruv Saklani",
    role: "Business Development Head",
    bio: "Brings over a decade of entrepreneurial and strategic leadership across financial services, healthcare and trading. Holding an MBA from the University of Edinburgh with a focus on strategy and negotiation, he has built and scaled his own business, with a track record in revenue growth, market analysis and company expansion. At Art for Unity, he brings the commercial rigour and long term thinking that allows the platform to operate sustainably without compromising its curatorial integrity. His conviction is simple: that growth is only meaningful when everyone at the table benefits. It is a principle that shapes every advisory conversation, acquisition and financial partnership the platform enters.",
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
      </div>
      <div className="mt-5">
        <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
          {m.name}
        </h3>
        <p className="mt-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-vermilion">
          <span className="h-1.5 w-1.5 rounded-full bg-vermilion" />
          {m.role}
        </p>
        <p className="mt-4 font-body text-sm leading-relaxed text-graphite-900/85">
          {m.bio}
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
                Who are we?
              </span>
            </h2>
          </div>
          <p
            data-reveal="up"
            data-delay="120"
            className="max-w-xs font-body text-graphite-900/80"
          >
            Together we hold every dimension of South Asian art: from studio to
            institution, from research to collection. That is not a claim. It is 70
            years of combined practice.
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
