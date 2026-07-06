/**
 * Builds a deterministic generative "artwork" as a standalone SVG string, so
 * it can be both rendered inline (ArtPiece) and rasterised into a WebGL texture
 * (RippleImage). Placeholder art until real artwork images are supplied.
 */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildArtSvg(seed = 1, palette) {
  const rnd = mulberry32(seed);
  const id = `a${seed}`;
  const [c0, c1, b1, b2, accent] = palette;

  let blobs = "";
  for (let i = 0; i < 4; i++) {
    const cx = 120 + rnd() * 360;
    const cy = 140 + rnd() * 460;
    const rx = 120 + rnd() * 200;
    const ry = 120 + rnd() * 220;
    const fill = i % 2 === 0 ? b1 : b2;
    const op = (0.4 + rnd() * 0.45).toFixed(2);
    blobs += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(
      1
    )}" ry="${ry.toFixed(1)}" fill="${fill}" opacity="${op}" filter="url(#blur-${id})"/>`;
  }

  let strokes = "";
  for (let i = 0; i < 2; i++) {
    const x1 = 60 + rnd() * 120;
    const y1 = 120 + rnd() * 500;
    const cx1 = 200 + rnd() * 200;
    const cy1 = rnd() * 750;
    const x2 = 380 + rnd() * 160;
    const y2 = 120 + rnd() * 500;
    const sw = (2 + rnd() * 6).toFixed(1);
    const op = (0.5 + rnd() * 0.4).toFixed(2);
    strokes += `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${cx1.toFixed(
      1
    )} ${cy1.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(
      1
    )}" stroke="${accent}" stroke-width="${sw}" stroke-linecap="round" fill="none" opacity="${op}"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" width="600" height="750">
    <defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/>
      </linearGradient>
      <filter id="blur-${id}" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="${(36 + rnd() * 26).toFixed(1)}"/>
      </filter>
      <filter id="grain-${id}">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <radialGradient id="vig-${id}" cx="0.5" cy="0.42" r="0.75">
        <stop offset="0.6" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity="0.32"/>
      </radialGradient>
    </defs>
    <rect width="600" height="750" fill="url(#bg-${id})"/>
    ${blobs}
    ${strokes}
    <rect width="600" height="750" filter="url(#grain-${id})" opacity="0.12"/>
    <rect width="600" height="750" fill="url(#vig-${id})"/>
  </svg>`;
}
