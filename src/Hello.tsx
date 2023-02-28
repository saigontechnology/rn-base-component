/**
 * Created by NL on 04/01/2023.
 */
// src/Hello.tsx
import React from 'react'
import {View} from 'react-native'
import styled from 'styled-components'
import {extendTheme} from './core/extendTheme'
import BaseProvider from './core/ThemeProvider'

const theme = extendTheme({
  colors: {
    demo: 'green',
  },
  darkColors: {
    demo: 'gray',
  },
})

const Hello = () => {
  return (
    <BaseProvider theme={theme}>
      <Welcome />
    </BaseProvider>
  )
}

const Welcome = () => {
  return <Demo />
}

export default Hello

const Demo = styled(View)`
  width: 100px;
  height: 100px;
  background-color: ${props => props?.theme?.demo};
`
