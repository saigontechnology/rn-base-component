import base from '../../base'
import {type ButtonThemeProps, ButtonTheme} from './Button'

export const ButtonTransparentTheme: ButtonThemeProps = {
  ...ButtonTheme,
  backgroundColor: 'transparent',
  textColor: base.colors.primary,
}
