import base from '../../base'
import {metrics} from '../../../helpers'
import type {ButtonProps} from '../../../components/Button/Button'

export type ButtonThemeProps = {
  height?: number
} & Pick<
  ButtonProps,
  'backgroundColor' | 'disabledColor' | 'borderRadius' | 'textColor' | 'outlineWidth' | 'outlineColor'
>

export const ButtonTheme: ButtonThemeProps = {
  height: metrics.xxl,
  backgroundColor: base.colors.primary,
  disabledColor: base.colors.muted,
  borderRadius: metrics.borderRadius,
  textColor: base.colors.white,
}
