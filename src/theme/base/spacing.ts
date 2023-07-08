const spacing = {
  tiny: 2,
  miniature: 4,
  petite: 6,
  small: 8,
  little: 10,
  compact: 12,
  narrow: 14,
  slim: 16,
  moderate: 18,
  average: 20,
  substantial: 22,
  large: 24,
  big: 26,
  grand: 28,
  huge: 30,
  giant: 32,
  colossal: 34,
  enormous: 36,
  mammoth: 38,
  titanic: 40,
}

export type ISpacing = keyof typeof spacing
export default spacing
