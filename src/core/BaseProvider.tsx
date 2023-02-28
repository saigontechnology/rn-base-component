import React, {createContext, useCallback, useMemo, useState} from 'react'
import {IColors, ITheme, theme as defaultTheme} from '../theme'
import {
  ThemeProvider as ThemeProviderStyled,
  ThemeContext as ThemeContextStyled,
  ThemeProviderComponent,
} from 'styled-components'
import type {ColorMode, IColorModeContextProps} from './color-mode/type'

export const BaseContext = createContext<{theme: ITheme} | IColorModeContextProps | {}>({})
type AnyIfEmpty<T extends object> = keyof T extends never ? any : T
const ThemeProvider: ThemeProviderComponent<AnyIfEmpty<IColors>> = ThemeProviderStyled
export const ThemeContext: React.Context<any> = ThemeContextStyled

export interface BaseProviderProps {
  children?: React.ReactNode
  theme?: ITheme
}

const BaseProvider = ({children, theme = defaultTheme}: BaseProviderProps) => {
  const [colorModeValue, setColorModeValue] = useState<ColorMode>(theme?.config.initialColorMode)

  const darkColor = useMemo(() => {
    return theme.darkColors
  }, [theme.darkColors])

  const isLight = useMemo(() => {
    return colorModeValue === 'light'
  }, [colorModeValue])

  const newTheme = useMemo(() => {
    return isLight ? theme.colors : darkColor
  }, [darkColor, isLight, theme])

  const toggleColorMode = useCallback(() => {
    isLight ? setColorModeValue('dark') : setColorModeValue('light')
  }, [isLight])

  const setColorMode = useCallback((value: ColorMode) => {
    setColorModeValue(value)
  }, [])

  return (
    <BaseContext.Provider
      value={{
        theme: newTheme,
        colorMode: colorModeValue,
        toggleColorMode,
        setColorMode,
      }}>
      <ThemeProvider theme={newTheme}>{children}</ThemeProvider>
    </BaseContext.Provider>
  )
}

export default BaseProvider
