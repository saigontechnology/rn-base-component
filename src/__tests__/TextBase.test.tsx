import React from 'react'
import {render} from '@testing-library/react-native'
import Text from '../components/Text/Text'

describe('Text', () => {
  it('renders Text correctly', () => {
    const {getByText} = render(<Text>Hello, World!</Text>)
    expect(getByText('Hello, World!')).toBeDefined()
  })

  it('renders Text.Bold correctly', () => {
    const {getByText} = render(<Text.Bold>Hello, Bold Text!</Text.Bold>)
    expect(getByText('Hello, Bold Text!')).toBeDefined()
  })

  it('renders Text.Underline correctly', () => {
    const {getByText} = render(<Text.Underline>Hello, Underlined Text!</Text.Underline>)
    expect(getByText('Hello, Underlined Text!')).toBeDefined()
  })

  it('renders Text.Title correctly', () => {
    const {getByText} = render(<Text.Title>Hello, Title Text!</Text.Title>)
    expect(getByText('Hello, Title Text!')).toBeDefined()
  })

  it('renders Text.Span correctly', () => {
    const {getByText} = render(<Text.Span>Hello, Span Text!</Text.Span>)
    expect(getByText('Hello, Span Text!')).toBeDefined()
  })
})
