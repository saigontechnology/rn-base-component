import type {StyleProp, ViewStyle, TextStyle, KeyboardTypeOptions} from 'react-native'
import {metrics} from '../../helpers'
import base from '../base'

export type CodeInputThemeProps = {
  /**
   * Number of code input cells
   */
  length: number
  /**
   * Style for individual cell
   */
  cellStyle?: StyleProp<ViewStyle>
  /**
   * Style for cell when it has a value
   */
  filledCellStyle?: StyleProp<ViewStyle>
  /**
   * Style for cell when it's focused
   */
  focusCellStyle?: StyleProp<ViewStyle>
  /**
   * Style for text inside cells
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Style for text when cell is focused
   */
  focusTextStyle?: StyleProp<TextStyle>
  /**
   * Style for secure text entry dots
   */
  secureViewStyle?: StyleProp<ViewStyle>
  /**
   * Style for the container holding all cells
   */
  cellContainerStyle?: StyleProp<ViewStyle>
  /**
   * Style for wrapper around each cell
   */
  cellWrapperStyle?: StyleProp<ViewStyle>
  /**
   * Style for wrapper around focused cell
   */
  focusCellWrapperStyle?: StyleProp<ViewStyle>
  /**
   * Enable secure text entry mode
   */
  secureTextEntry: boolean
  /**
   * Keyboard type for input
   */
  keyboardType: KeyboardTypeOptions
  /**
   * Show cursor in focused cell
   */
  withCursor: boolean
  /**
   * Placeholder text for empty cells
   */
  placeholder?: string
  /**
   * Color for placeholder text
   */
  placeholderTextColor: string
  /**
   * Render placeholder as dot instead of text
   */
  placeholderAsDot: boolean
  /**
   * Style for placeholder dot
   */
  placeholderDotStyle?: StyleProp<ViewStyle>
  /**
   * Auto focus on mount
   */
  autoFocus: boolean
  /**
   * Disable input
   */
  disabled: boolean
}

export const CodeInputTheme: CodeInputThemeProps = {
  length: 6,
  cellStyle: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: base.colors.primaryBorder,
    borderRadius: metrics.borderRadius,
    backgroundColor: base.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledCellStyle: {
    borderColor: base.colors.primary,
  },
  focusCellStyle: {
    borderColor: base.colors.primary,
    borderWidth: 2,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: base.colors.black,
  },
  focusTextStyle: {
    color: base.colors.primary,
  },
  secureViewStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: base.colors.black,
  },
  cellContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cellWrapperStyle: undefined,
  focusCellWrapperStyle: undefined,
  secureTextEntry: false,
  keyboardType: 'number-pad',
  withCursor: true,
  placeholder: undefined,
  placeholderTextColor: base.colors.gray,
  placeholderAsDot: false,
  placeholderDotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: base.colors.gray,
  },
  autoFocus: false,
  disabled: false,
}
