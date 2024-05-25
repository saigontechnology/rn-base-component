import {useTheme as useThemeStyled} from 'styled-components/native'

export const useTheme = () => {
  const theme = useThemeStyled()

  if (!theme) {
    throw Error('`theme` is undefined. Seems you forgot to wrap your app in `<BaseProvider />`')
  }

  return theme
}
