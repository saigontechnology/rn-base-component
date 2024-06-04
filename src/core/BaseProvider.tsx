import React, {createContext, useCallback, useMemo, useState} from 'react'
import {ThemeProvider} from 'styled-components/native'
import {ITheme, theme as defaultTheme} from '../theme'
import type {ColorMode, IColorModeContextProps} from './color-mode/type'

export type IBaseContext = {theme: ITheme} | IColorModeContextProps
export const BaseContext = createContext<IBaseContext | null>(null)

export interface BaseProviderProps {
  children?: React.ReactNode
  theme?: ITheme
}

export const BaseProvider = ({children, theme = defaultTheme}: BaseProviderProps) => {
  const [colorModeValue, setColorModeValue] = useState(theme?.config.initialColorMode)

  const isLight = useMemo(() => colorModeValue === 'light', [colorModeValue])

  const darkTheme = useMemo(() => ({...theme, colors: {...theme.colors, ...theme.darkColors}}), [theme])

  const newTheme = useMemo(() => (isLight ? theme : darkTheme), [darkTheme, isLight, theme])

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
