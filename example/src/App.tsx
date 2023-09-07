import React from 'react'
import {BaseProvider, extendTheme} from 'rn-base-component'
import StorybookUIRoot from '../.ondevice/Storybook'

const theme = extendTheme({
  colors: {
    primary: '#7239E5',
    secondary: '#FFBB33',
    backgroundPrimary: '#F5F2F1',
    backgroundSecondary: '#D1D1D1',
    lightBackground: '#FFFFFF',
    mainBackground: '#F0F2F3',
    backgroundColor: '#FFFFFF',
    cardPrimaryBackground: 'green',

    // border
    primaryBorder: '#454545',

    // text
    textColor: '#0B0B0B',
    lightTextColor: '#FFFFFF',
    darkTextColor: '#333333',
    placeHolderText: '#929298',
    errorText: '#ff0009',
  },
  darkColors: {
    primary: '#11EFE8',
    secondary: '#DADD12',
    backgroundPrimary: '#F1F1F1',
    backgroundSecondary: '#6610BC',
    lightBackground: '#000000',
    mainBackground: '#F0F2F3',
    backgroundColor: '#5F6066',
    cardPrimaryBackground: 'gray',

    // border
    primaryBorder: '#BABABA',

    // text
    textColor: '#F0EEEC',
    lightTextColor: '#333333',
    darkTextColor: '#FFFFFF',
    placeHolderText: '#A7A7AC',
    errorText: '#FF4C52',
  },
})

const App = () => (
  <BaseProvider theme={theme}>
    <StorybookUIRoot />
  </BaseProvider>
)

export default App
