import base from '../../base'
import {metrics} from '../../../helpers'

export type ButtonThemeProps = {
  height?: number
  backgroundColor?: string
  disabledColor?: string
  borderRadius?: number
  labelColor?: string
}

export const ButtonTheme: ButtonThemeProps = {
  height: metrics.xxl,
  backgroundColor: base.colors.green,
  disabledColor: base.colors.muted,
  borderRadius: metrics.borderRadius,
  labelColor: base.colors.white,
}
