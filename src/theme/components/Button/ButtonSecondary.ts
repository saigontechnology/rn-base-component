import base from '../../base'
import {type ButtonThemeProps, ButtonTheme} from './Button'

export const ButtonSecondaryTheme: ButtonThemeProps = {
  ...ButtonTheme,
  backgroundColor: base.colors.secondary,
  textColor: base.colors.white,
}
