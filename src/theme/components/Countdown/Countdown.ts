import base from '../../base'
import {metrics} from '../../../helpers'
import type {CountDownProps} from '../../../components/CountDown/CountDown'

export type CountDownThemeProps = {} & Pick<CountDownProps, 'textStyle'>

export const CountDownTheme: CountDownThemeProps = {
  textStyle: {
    color: base.colors.black,
    fontSize: metrics.sMedium,
  },
}
