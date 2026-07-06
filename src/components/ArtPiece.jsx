import { buildArtSvg } from "../lib/buildArtSvg";

/**
 * Renders a generative placeholder artwork inline (used in the gallery grid).
 * The SVG itself is built by `buildArtSvg` so the same art can be rasterised
 * into a WebGL texture for the lightbox ripple effect.
 */
export default function ArtPiece({ seed = 1, palette }) {
  return (
    <div
      className="art-fill h-full w-full"
      role="img"
      dangerouslySetInnerHTML={{ __html: buildArtSvg(seed, palette) }}
    />
  );
}
