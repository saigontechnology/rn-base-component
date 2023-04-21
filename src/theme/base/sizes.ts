const sizes = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 20,
  huge: 24,
  enormous: 32,
  massive: 48,
  gargantuan: 64,
  colossal: 96,
  gigantic: 128,
  extraLarge: 160,
  jumbo: 200,
}

export type ISize = keyof typeof sizes
export default sizes
