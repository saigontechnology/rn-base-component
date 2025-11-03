import type {StyleProp, ViewStyle, TextStyle} from 'react-native'
import type {IRadioButtonProps} from '../../components'
// responsiveHeight is available but not used in theme defaults
import base from '../base'

export type RadioButtonThemeProps = Pick<
  IRadioButtonProps,
  'outerSize' | 'innerSize' | 'ringColor' | 'innerBackgroundColor' | 'disabled' | 'disableOpacity' | 'initial'
> & {
  /**
   * Default style for radio button wrapper
   */
  wrapperStyle?: StyleProp<ViewStyle>
  /**
   * Default style for radio button ring
   */
  style?: StyleProp<ViewStyle>
  /**
   * Default style for inner container
   */
  innerContainerStyle?: StyleProp<ViewStyle>
  /**
   * Default style for text container
   */
  textContainerStyle?: StyleProp<ViewStyle>
  /**
   * Default style for text label
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Border width for radio button ring
   */
  borderWidth: number
}

const OUTER_SIZE_DEFAULT = 45
const INNER_SIZE_DEFAULT = 25
const OPACITY_DEFAULT = 0.5

export const RadioButtonTheme: RadioButtonThemeProps = {
  outerSize: OUTER_SIZE_DEFAULT,
  innerSize: INNER_SIZE_DEFAULT,
  ringColor: base.colors.darkBlue,
  innerBackgroundColor: base.colors.darkBlue,
  disabled: false,
  disableOpacity: OPACITY_DEFAULT,
  initial: false,
  borderWidth: base.borderWidths.little,
  wrapperStyle: undefined,
  style: undefined,
  innerContainerStyle: undefined,
  textContainerStyle: undefined,
  textStyle: undefined,
}
