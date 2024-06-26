const borderWidths = {
  tiny: 1,
  miniature: 2,
  petite: 3,
  small: 4,
  little: 5,
  compact: 6,
  narrow: 7,
  slim: 8,
  moderate: 9,
  average: 10,
  substantial: 11,
  large: 12,
  big: 13,
  grand: 14,
  huge: 15,
  giant: 16,
  colossal: 17,
  enormous: 18,
  mammoth: 19,
  titanic: 20,
} as const

export type IBorderWidth = keyof typeof borderWidths
export default borderWidths
