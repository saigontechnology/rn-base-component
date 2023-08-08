import React from 'react'
import {render} from '@testing-library/react-native'
import {Text, TextBold, TextItalic} from '../components'

describe('Text', () => {
  it('renders Text correctly', () => {
    const {getByText} = render(<Text>Hello, World!</Text>)
    expect(getByText('Hello, World!')).toBeDefined()
  })

  it('renders TextBold correctly', () => {
    const {getByText} = render(<TextBold>Hello, Bold Text!</TextBold>)
    expect(getByText('Hello, Bold Text!')).toBeDefined()
  })

  it('renders TextItalic correctly', () => {
    const {getByText} = render(<TextItalic>Hello, Italic Text!</TextItalic>)
    expect(getByText('Hello, Italic Text!')).toBeDefined()
  })
})
