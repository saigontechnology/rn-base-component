import {useContext} from 'react'
import {useColorScheme} from 'react-native'
import light from './light'
import dark from './dark'
import type {ThemeType} from './type'
import {ThemeContext} from '../ThemeProvider'

export default {
  light,
  dark,
} as ThemeType

export const useComponentTheme = (component: string) => {
  const themeContext = useContext(ThemeContext)
  const deviceTheme = useColorScheme()
  return themeContext[deviceTheme][component] || null
}
