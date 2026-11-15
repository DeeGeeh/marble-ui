const COAT = { base: "#948a7d", lightness: -0.1, chroma: 0.3, ring: 0.26 }

const tone = (shift = 0) =>
  `oklch(from ${COAT.base} calc(l + ${COAT.lightness + shift}) calc(c * ${COAT.chroma}) h)`

const CHARCOAL = "#1c1917"

export const simppaPalette = {
  o: `color-mix(in srgb, ${CHARCOAL} 86%, #fff)`,
  e: CHARCOAL,
  w: "#fdfcf9",
  p: "color-mix(in srgb, #c4341a 90%, #fff)",
  n: CHARCOAL,
  c: tone(),
  l: tone(0.06),
  r: tone(COAT.ring),
  b: tone(0.1),
  d: tone(-0.07),
  m: tone(0.13),
}
