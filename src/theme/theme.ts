/* eslint-disable @typescript-eslint/no-empty-interface */
import type {ColorModeOptions} from '../core/color-mode/type'
import base from './base'
import components from './components'

const config: ColorModeOptions = {
  useSystemColorMode: false,
  initialColorMode: 'light',
}

const darkColors = base.colors

const theme = {
  ...base,
  components,
  config,
  darkColors,
}

type Theme = typeof theme
type DarkColors = typeof darkColors
type IColors = typeof theme.colors
interface ICustomTheme {}
interface ITheme extends ICustomTheme, Omit<Theme, keyof ICustomTheme> {}

export {theme, Theme, ITheme, ICustomTheme, DarkColors, IColors}
