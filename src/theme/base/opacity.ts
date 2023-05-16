const opacity = {
  tiny: 0,
  miniature: 0.05,
  petite: 0.1,
  small: 0.2,
  little: 0.25,
  compact: 0.3,
  narrow: 0.4,
  slim: 0.5,
  moderate: 0.6,
  average: 0.7,
  substantial: 0.75,
  large: 0.8,
  big: 0.9,
  grand: 0.95,
  huge: 1,
}

export type IOpacity = keyof typeof opacity
export default opacity
