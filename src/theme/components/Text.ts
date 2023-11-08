import type {TextProps} from '../../components'
import {metrics} from '../../helpers'
import base from '../base'

export type TextThemeProps = Pick<TextProps, 'fontSize' | 'color'>

export const TextTheme: TextThemeProps = {
  fontSize: metrics.span,
  color: base.colors.black,
}
