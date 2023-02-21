import React, {createContext} from 'react'
import defaultTheme from './theme'
import type {ThemeType} from './theme/type'

export const ThemeContext = createContext<ThemeType>(defaultTheme)

const mergeTheme = (original: ThemeType, custom: ThemeType): ThemeType => {
  const darkTheme = Object.assign({}, original.dark)
  const darkThemeCustom = custom.dark || {}
  ;(Object.keys(darkThemeCustom) as Array<keyof typeof darkThemeCustom>).forEach(item => {
    darkTheme[item] = {...darkTheme[item], ...darkThemeCustom[item]}
  })
  const lightTheme = Object.assign({}, original.light)
  const lightThemeCustom = custom.light || {}
  ;(Object.keys(lightThemeCustom) as Array<keyof typeof lightThemeCustom>).forEach(item => {
    lightTheme[item] = {...lightTheme[item], ...lightThemeCustom[item]}
  })
  return {
    light: lightTheme,
    dark: darkTheme,
  }
}

const ThemeProvider = ({theme, children}: {theme: ThemeType; children: React.ReactElement}) => {
  const newTheme = mergeTheme(defaultTheme, theme)
  return <ThemeContext.Provider value={newTheme}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
