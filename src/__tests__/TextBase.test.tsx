import React from 'react'
import {render} from '@testing-library/react-native'
import BaseText from '../components/Text/Text'

describe('BaseText', () => {
  it('renders BaseText correctly', () => {
    const {getByText} = render(<BaseText>Hello, World!</BaseText>)
    expect(getByText('Hello, World!')).toBeDefined()
  })

  it('renders BaseText.Bold correctly', () => {
    const {getByText} = render(<BaseText.Bold>Hello, Bold Text!</BaseText.Bold>)
    expect(getByText('Hello, Bold Text!')).toBeDefined()
  })

  it('renders BaseText.Underline correctly', () => {
    const {getByText} = render(<BaseText.Underline>Hello, Underlined Text!</BaseText.Underline>)
    expect(getByText('Hello, Underlined Text!')).toBeDefined()
  })

  it('renders BaseText.Title correctly', () => {
    const {getByText} = render(<BaseText.Title>Hello, Title Text!</BaseText.Title>)
    expect(getByText('Hello, Title Text!')).toBeDefined()
  })

  it('renders BaseText.Span correctly', () => {
    const {getByText} = render(<BaseText.Span>Hello, Span Text!</BaseText.Span>)
    expect(getByText('Hello, Span Text!')).toBeDefined()
  })
})
