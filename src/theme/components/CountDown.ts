import type {CountDownProps} from '../../components'
import {metrics} from '../../helpers'
import base from '../base'

export type CountDownThemeProps = Pick<CountDownProps, 'fontSize' | 'textColor'> & {
  /**
   * Font size for time unit labels (d, h, m, s)
   */
  labelFontSize: number
  /**
   * Color for time unit labels
   */
  labelColor: string
}

export const CountDownTheme: CountDownThemeProps = {
  fontSize: metrics.large,
  textColor: base.colors.black,
  labelFontSize: metrics.tiny,
  labelColor: base.colors.gray,
}
