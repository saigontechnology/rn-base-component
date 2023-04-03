import React from 'react'
import {BaseProvider, extendTheme} from 'rn-base-component'
import StorybookUIRoot from '../.ondevice/Storybook'

const theme = extendTheme({
  colors: {
    cardPrimaryBackground: 'green',
  },
  darkColors: {
    cardPrimaryBackground: 'gray',
  },
})

const App = () => (
  <BaseProvider theme={theme}>
    <StorybookUIRoot />
  </BaseProvider>
)

export default App
