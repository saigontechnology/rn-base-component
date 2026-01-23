import type {StyleProp, ViewStyle, TextStyle} from 'react-native'
import type {TextInputProps} from '../../components'
import {metrics} from '../../helpers'
import base from '../base'

export type TextInputThemeProps = Pick<TextInputProps, 'editable' | 'numberOfLines' | 'multiline'> & {
  /**
   * Style for container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Styling for Input Component Container
   */
  inputContainerStyle?: StyleProp<ViewStyle>
  /**
   * Style for Input Component
   */
  inputStyle?: StyleProp<TextStyle>
  /**
   * Styling for the label
   */
  labelStyle?: StyleProp<TextStyle>
  /**
   * Placeholder text color
   */
  placeholderTextColor: string
  /**
   * Border color for input
   */
  borderColor: string
  /**
   * Border color when input is focused
   */
  focusedBorderColor: string
  /**
   * Background color for input
   */
  backgroundColor: string
  /**
   * Text color for input
   */
  textColor: string
  /**
   * Label text color
   */
  labelColor: string
  /**
   * Error text color
   */
  errorColor: string
  /**
   * Border radius for input
   */
  borderRadius: number
  /**
   * Border width for input
   */
  borderWidth: number
  /**
   * Padding for input
   */
  padding: number
  /**
   * Font size for input text
   */
  fontSize: number
  /**
   * Font size for label
   */
  labelFontSize: number
  /**
   * Font size for error text
   */
  errorFontSize: number
  /**
   * Auto focus the input by touching it's container
   */
  focusOnTouch: boolean
}

export const TextInputTheme: TextInputThemeProps = {
  editable: true,
  numberOfLines: 1,
  multiline: false,
  containerStyle: undefined,
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: metrics.borderRadius,
    paddingHorizontal: base.spacing.slim,
    paddingVertical: base.spacing.small,
  },
  inputStyle: {
    fontSize: 16,
    color: base.colors.black,
  },
  labelStyle: {
    fontSize: 14,
    marginBottom: base.spacing.tiny,
    color: base.colors.darkText,
  },
  placeholderTextColor: base.colors.gray,
  borderColor: base.colors.primaryBorder,
  focusedBorderColor: base.colors.primary,
  backgroundColor: base.colors.white,
  textColor: base.colors.black,
  labelColor: base.colors.darkText,
  errorColor: base.colors.error,
  borderRadius: metrics.borderRadius,
  borderWidth: 1,
  padding: base.spacing.slim,
  fontSize: 16,
  labelFontSize: 14,
  errorFontSize: 12,
  focusOnTouch: false,
}
