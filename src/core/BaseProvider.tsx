import React, {createContext, useCallback, useMemo, useState} from 'react'
import {ThemeProvider as ThemeProviderStyled, ThemeProviderComponent} from 'styled-components'
import {ITheme, theme as defaultTheme} from '../theme'
import type {ColorMode, IColorModeContextProps} from './color-mode/type'

export type IBaseContext = {theme: ITheme} | IColorModeContextProps
export const BaseContext = createContext<IBaseContext | null>(null)
type AnyIfEmpty<T extends object> = keyof T extends never ? any : T
const ThemeProvider: ThemeProviderComponent<AnyIfEmpty<ITheme>> = ThemeProviderStyled

export interface BaseProviderProps {
  children?: React.ReactNode
  theme?: ITheme
}

const BaseProvider = ({children, theme = defaultTheme}: BaseProviderProps) => {
  const [colorModeValue, setColorModeValue] = useState(theme?.config.initialColorMode)

  const isLight = useMemo(() => {
    return colorModeValue === 'light'
  }, [colorModeValue])

  const darkTheme = useMemo(() => {
    return {...theme, colors: {...theme.colors, ...theme.darkColors}}
  }, [theme])

  const newTheme = useMemo(() => {
    return isLight ? theme : darkTheme
  }, [darkTheme, isLight, theme])

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
