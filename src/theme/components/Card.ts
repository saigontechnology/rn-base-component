import type {StyleProp, ViewStyle} from 'react-native'
import {metrics} from '../../helpers'
import base from '../base'

export type CardThemeProps = {
  /**
   * Padding inside the card
   */
  padding: number
  /**
   * Border radius for the card
   */
  borderRadius: number
  /**
   * Background color of the card
   */
  backgroundColor: string
  /**
   * Custom style for the card container
   */
  style?: StyleProp<ViewStyle>
}

export const CardTheme: CardThemeProps = {
  padding: base.spacing.slim,
  borderRadius: metrics.borderRadius,
  backgroundColor: base.colors.cardBackground,
  style: undefined,
}
