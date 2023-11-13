import base from '../../base'
import {metrics} from '../../../helpers'
import type {TouchableOpacityProps} from '../../../components/Button/TouchableOpacity'

export type TouchableOpacityThemeProps = {
  height?: number
} & Pick<
  TouchableOpacityProps,
  'backgroundColor' | 'disabledColor' | 'borderRadius' | 'outlineWidth' | 'outlineColor'
>

export const TouchableOpacityTheme: TouchableOpacityThemeProps = {
  height: metrics.xxl,
  backgroundColor: base.colors.primary,
  disabledColor: base.colors.muted,
  borderRadius: metrics.borderRadius,
}
