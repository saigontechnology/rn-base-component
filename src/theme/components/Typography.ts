import type {StyleProp, TextStyle} from 'react-native'
import base from '../base'
// Define types locally since TypographyProps is not exported
export type TypographyVariant = 'h1' | 'h2' | 'regular' | 'bold'
type TypographyProps = {
  color?: string
  variant?: TypographyVariant
}

export type TypographyThemeProps = Pick<TypographyProps, 'color' | 'variant'> & {
  /**
   * Default typography variant styles
   */
  variantStyles: Record<TypographyVariant, TextStyle>
  /**
   * Default style for typography component
   */
  style?: StyleProp<TextStyle>
}

export const TypographyTheme: TypographyThemeProps = {
  color: base.colors.darkText,
  variant: 'regular',
  variantStyles: {
    h1: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 28,
    },
    regular: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 24,
    },
    bold: {
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: 24,
    },
  },
  style: undefined,
}
