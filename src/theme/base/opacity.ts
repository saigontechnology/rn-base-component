const opacity = {
  transparent: 0,
  translucent: 0.05,
  hazy: 0.1,
  misty: 0.2,
  faint: 0.25,
  lightyOpaque: 0.3,
  semiOpaque: 0.4,
  partiallyOpaque: 0.5,
  clouded: 0.6,
  murky: 0.7,
  opaque: 0.75,
  solid: 0.8,
  dense: 0.9,
  darkened: 0.95,
  blackened: 1,
}

export type IOpacity = keyof typeof opacity
export default opacity
