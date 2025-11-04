import type {StyleProp, ViewStyle} from 'react-native'
import base from '../base'
import {metrics} from '../../helpers'
import type {ICheckboxProps} from '../../components/Checkbox/Checkbox'

export type CheckboxThemeProps = {
  style?: StyleProp<ViewStyle>
} & Pick<
  ICheckboxProps,
  'size' | 'borderRadius' | 'fillColor' | 'unfillColor' | 'checkMarkColor' | 'borderWidth'
>

export const CheckboxTheme: CheckboxThemeProps = {
  size: base.sizes.narrow,
  borderRadius: metrics.borderRadius,
  fillColor: base.colors.primary,
  unfillColor: base.colors.transparent,
  checkMarkColor: base.colors.white,
  borderWidth: base.borderWidths.tiny,
  style: undefined,
}
