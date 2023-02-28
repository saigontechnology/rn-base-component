import {theme as defaultTheme, Theme} from '../theme'

type ThemeUtil = Theme | (Record<string, any> & {})

export function extendTheme<T extends ThemeUtil>(overrides: T) {
  const theme = Object.assign({}, defaultTheme, overrides)
  return theme
}
