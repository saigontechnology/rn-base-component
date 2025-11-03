import React from 'react'
import {render} from '@testing-library/react-native'
import {Text, TextBold, TextItalic} from '../components'
import {BaseProvider} from '../core'

const renderWithProvider = (component: React.ReactElement) => render(<BaseProvider>{component}</BaseProvider>)

describe('Text', () => {
  it('renders Text correctly', () => {
    const {getByText} = renderWithProvider(<Text>Hello, World!</Text>)
    expect(getByText('Hello, World!')).toBeDefined()
  })

  it('renders TextBold correctly', () => {
    const {getByText} = renderWithProvider(<TextBold>Hello, Bold Text!</TextBold>)
    expect(getByText('Hello, Bold Text!')).toBeDefined()
  })

  it('renders TextItalic correctly', () => {
    const {getByText} = renderWithProvider(<TextItalic>Hello, Italic Text!</TextItalic>)
    expect(getByText('Hello, Italic Text!')).toBeDefined()
  })
})
