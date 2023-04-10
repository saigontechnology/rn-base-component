import React from 'react'
import {BaseProvider, extendTheme} from 'rn-base-component'
import StorybookUIRoot from '../.ondevice/Storybook'

const theme = extendTheme({
  colors: {
    primary: '#7239E5',
    secondary: '#FFBB33',
    backgroundPrimary: '#F5F2F1',
    backgroundSecondary: '#D1D1D1',
    mainBackground: '#F0F2F3',
    backgroundColor: '#FFFFFF',
    cardPrimaryBackground: 'green',
    textColor: '#0B0B0B',
    textLightColor: '#FFFFFF',
  },
  darkColors: {
    primary: '#11EFE8',
    secondary: '#DADD12',
    backgroundPrimary: '#F1F1F1',
    backgroundSecondary: '#6610BC',
    mainBackground: '#F0F2F3',
    backgroundColor: '#5F6066',
    cardPrimaryBackground: 'gray',
    textColor: '#0B0B0B',
    textLightColor: '#333333',
  },
})

const App = () => (
  <BaseProvider theme={theme}>
    <StorybookUIRoot />
  </BaseProvider>
)

export default App
