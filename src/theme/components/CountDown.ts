import {StyleProp, TextStyle} from 'react-native'
import type {CountDownProps} from '../../components'
import {metrics} from '../../helpers'
import base from '../base'

export type CountDownThemeProps = Pick<
  CountDownProps,
  'fontSize' | 'textColor' | 'fontFamily' | 'textStyle'
> & {
  /**
   * Font size for time unit labels (d, h, m, s)
   */
  labelFontSize: number
  /**
   * Color for time unit labels
   */
  labelColor: string
  /**
   * Font family for time unit labels
   */
  fontFamily: string
  /**
   * Custom text style for countdown text
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Custom text style for time unit labels
   */
  unitTextStyle?: StyleProp<TextStyle>
}

export const CountDownTheme: CountDownThemeProps = {
  fontSize: metrics.large,
  textColor: base.colors.black,
  labelFontSize: metrics.small,
  labelColor: base.colors.gray,
  fontFamily: base.fonts.regular as string,
  textStyle: undefined, // Optional custom text style
  unitTextStyle: undefined, // Optional custom unit text style
}
