const borderWidths = {
  smallest: 1,
  tiny: 2,
  small: 4,
  medium: 6,
  large: 8,
  huge: 10,
  enormous: 12,
  massive: 14,
  gargantuan: 16,
  colossal: 18,
  largest: 20,
}

export type IBorderWidth = keyof typeof borderWidths
export default borderWidths
