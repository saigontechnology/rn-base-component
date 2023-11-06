import base from '../../base'
import {type ButtonThemeProps, ButtonTheme} from './Button'

export const ButtonPrimaryTheme: ButtonThemeProps = {
  ...ButtonTheme,
  backgroundColor: base.colors.primary,
  labelColor: base.colors.white,
}
