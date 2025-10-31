import type {StyleProp, ViewStyle, TextStyle} from 'react-native'
import {metrics} from '../../helpers'
import base from '../base'

export type CodeInputThemeProps = {
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
   * Color for placeholder text
   */
  placeholderTextColor: string
  /**
   * Style for placeholder dot
   */
  placeholderDotStyle?: StyleProp<ViewStyle>
  /**
   * Style for outer container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Styling for the label
   */
  labelStyle?: StyleProp<TextStyle>
  /**
   * Style for cell in error state
   */
  errorCellStyle?: StyleProp<ViewStyle>
  /**
   * Style for cell in success state
   */
  successCellStyle?: StyleProp<ViewStyle>
  /**
   * Style for cell in disabled state
   */
  disabledCellStyle?: StyleProp<ViewStyle>
  /**
   * Style for cell in active state (alias for focusCellStyle)
   */
  activeCellStyle?: StyleProp<ViewStyle>
}

export const CodeInputTheme: CodeInputThemeProps = {
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
    fontWeight: 'normal',
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
  placeholderTextColor: base.colors.gray,
  placeholderDotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: base.colors.gray,
  },
  containerStyle: undefined,
  labelStyle: {
    fontSize: 14,
    color: base.colors.darkText,
    marginBottom: 8,
  },
  errorCellStyle: {
    borderColor: base.colors.error,
    borderWidth: 2,
  },
  successCellStyle: {
    borderColor: base.colors.success,
    borderWidth: 2,
  },
  disabledCellStyle: {
    backgroundColor: '#f5f5f5',
    borderColor: base.colors.primaryBorder,
    opacity: 0.5,
  },
  activeCellStyle: {
    borderColor: base.colors.primary,
    borderWidth: 2,
  },
}
