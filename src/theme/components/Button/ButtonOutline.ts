import base from '../../base'
import {type ButtonThemeProps, ButtonTheme} from './Button'

export const ButtonOutlineTheme: ButtonThemeProps = {
  ...ButtonTheme,
  backgroundColor: 'transparent',
  textColor: base.colors.primary,
  outlineWidth: base.borderWidths.tiny,
  outlineColor: base.colors.primary,
}
