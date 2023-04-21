const spacing = {
  mini: 2,
  tiny: 4,
  micro: 6,
  xxs: 8,
  xs: 12,
  small: 16,
  sMedium: 18,
  medium: 20,
  large: 24,
  xl: 28,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  massive: 64,
  giant: 80,
}

export type ISpacing = keyof typeof spacing
export default spacing
