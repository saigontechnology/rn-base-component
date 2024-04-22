import React from 'react'
import {render} from '@testing-library/react-native'
import {Text, TextBold, TextItalic} from '../components'
import {BaseProvider} from '../core'

const renderElement = (Component: React.ReactElement) => render(<BaseProvider>{Component}</BaseProvider>)

describe('Text', () => {
  it('renders Text correctly', () => {
    const {getByText} = renderElement(<Text>Hello, World!</Text>)
    expect(getByText('Hello, World!')).toBeDefined()
  })

  it('renders TextBold correctly', () => {
    const {getByText} = renderElement(<TextBold>Hello, Bold Text!</TextBold>)
    expect(getByText('Hello, Bold Text!')).toBeDefined()
  })

  it('renders TextItalic correctly', () => {
    const {getByText} = renderElement(<TextItalic>Hello, Italic Text!</TextItalic>)
    expect(getByText('Hello, Italic Text!')).toBeDefined()
  })
})
