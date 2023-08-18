import {fireEvent, render} from '@testing-library/react-native'
import React from 'react'
import {Text} from 'react-native'
import Card from '../components/Card/Card'
import {BaseProvider} from '../core'

describe('Card', () => {
  it('renders correctly', () => {
    const {toJSON} = render(
      <BaseProvider>
        <Card />
      </BaseProvider>,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  it('renders children correctly', () => {
    const {getByText} = render(
      <BaseProvider>
        <Card>
          <Text>Test Children</Text>
        </Card>
      </BaseProvider>,
    )
    expect(getByText('Test Children')).toBeTruthy()
  })

  it('handles onPress correctly', () => {
    const mockOnPress = jest.fn()
    const {getByTestId} = render(
      <BaseProvider>
        <Card onPress={mockOnPress} />
      </BaseProvider>,
    )
    const card = getByTestId('card')
    fireEvent.press(card)
    expect(mockOnPress).toHaveBeenCalled()
  })

  it('applies background color correctly', () => {
    const {toJSON} = render(
      <BaseProvider>
        <Card />
      </BaseProvider>,
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
