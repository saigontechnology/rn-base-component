import base from '../base'
import {metrics} from '../../helpers'

export type CheckboxThemeProps = {
  size?: number
  borderRadius?: number
  fillColor?: string
  unfillColor?: string
  borderWidth?: number
}

export const CheckboxTheme: CheckboxThemeProps = {
  size: base.sizes.narrow,
  borderRadius: metrics.borderRadius,
  fillColor: base.colors.primary,
  unfillColor: base.colors.transparent,
  borderWidth: base.borderWidths.tiny,
}
