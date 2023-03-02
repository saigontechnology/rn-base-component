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
import type {ITheme} from './theme'

const theme = extendTheme({
  colors: {
    cardPrimaryBackground: 'green',
  },
  darkColors: {
    cardPrimaryBackground: 'gray',
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
  background-color: ${(props: {theme: ITheme}) => props?.theme?.colors?.cardPrimaryBackground};
`
