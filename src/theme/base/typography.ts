import {Platform} from 'react-native'

const typography = {
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
    extraBlack: 950,
  },
  fonts: {
    heading: undefined,
    body: undefined,
    mono: undefined,
    regular: Platform.select({
      ios: 'ArialMT',
      android: 'sans-serif',
    }),
    bold: Platform.select({
      ios: 'Arial-BoldMT',
      android: 'sans-serif-medium',
    }),
    italic: Platform.select({
      ios: 'Arial-ItalicMT',
      android: 'sans-serif-medium',
    }),
  },
  fontSizes: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
} as const

export type ITypography = typeof typography
export type IFontSize = keyof typeof typography.fontSizes
export type IFontWeight = keyof typeof typography.fontWeights
export type IFont = keyof typeof typography.fonts

export default typography
