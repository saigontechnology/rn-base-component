/**
 * Created by NL on 04/01/2023.
 */
// src/Hello.tsx
import React from 'react'
import styled from 'styled-components/native'
import {extendTheme} from './core/extendTheme'
import BaseProvider from './core/BaseProvider'
import {useTheme} from './hooks/useTheme'
import {useBase} from './hooks/useBase'

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
  const {} = useBase()
  const {} = useTheme()

  return <Demo />
}

export default Hello

const Demo = styled.View`
  width: 100px;
  height: 100px;
  background-color: ${props => props?.theme?.colors?.demo};
`
