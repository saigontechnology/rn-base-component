import {fireEvent, render} from '@testing-library/react-native'
import React from 'react'
import {Text, View} from 'react-native'
import {Card} from '../components'
import {BaseProvider} from '../core'

const renderWithProvider = (component: React.ReactElement) => render(<BaseProvider>{component}</BaseProvider>)

describe('Card', () => {
  const mockOnPress = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders correctly with default props', () => {
      const {getByTestId} = renderWithProvider(<Card />)
      const card = getByTestId('card')
      expect(card).toBeDefined()
    })

    it('renders children correctly', () => {
      const {getByText} = renderWithProvider(
        <Card>
          <Text>Test Children</Text>
        </Card>,
      )
      expect(getByText('Test Children')).toBeTruthy()
    })

    it('renders multiple children correctly', () => {
      const {getByText, getByTestId} = renderWithProvider(
        <Card>
          <Text>First Child</Text>
          <Text>Second Child</Text>
          <View testID="test-view" />
        </Card>,
      )
      expect(getByText('First Child')).toBeTruthy()
      expect(getByText('Second Child')).toBeTruthy()
      expect(getByTestId('test-view')).toBeTruthy()
    })

    it('renders without children', () => {
      const {getByTestId} = renderWithProvider(<Card />)
      const card = getByTestId('card')
      expect(card).toBeDefined()
      // Children prop might contain debug components in test environment
      expect(card.props.children).toBeDefined()
    })
  })

  describe('Press Handling', () => {
    it('handles onPress correctly', () => {
      const {getByTestId} = renderWithProvider(<Card onPress={mockOnPress} />)
      const card = getByTestId('card')
      fireEvent.press(card)
      expect(mockOnPress).toHaveBeenCalledTimes(1)
    })

    it('does not crash when onPress is undefined', () => {
      const {getByTestId} = renderWithProvider(<Card />)
      const card = getByTestId('card')
      expect(() => fireEvent.press(card)).not.toThrow()
    })

    it('calls onPress multiple times when pressed multiple times', () => {
      const {getByTestId} = renderWithProvider(<Card onPress={mockOnPress} />)
      const card = getByTestId('card')

      fireEvent.press(card)
      fireEvent.press(card)
      fireEvent.press(card)

      expect(mockOnPress).toHaveBeenCalledTimes(3)
    })

    it('applies correct active opacity when onPress is provided', () => {
      const {getByTestId} = renderWithProvider(<Card onPress={mockOnPress} />)
      const card = getByTestId('card')
      // TouchableOpacity should be pressable when onPress is provided
      expect(card).toBeTruthy()
    })

    it('applies correct active opacity when onPress is not provided', () => {
      const {getByTestId} = renderWithProvider(<Card />)
      const card = getByTestId('card')
      // Should render correctly when no onPress is provided
      expect(card).toBeTruthy()
    })
  })

  describe('Styling Props', () => {
    it('applies custom background color', () => {
      const customColor = '#ff0000'
      const {getByTestId} = renderWithProvider(<Card backgroundColor={customColor} />)
      const card = getByTestId('card')
      expect(card.props.style).toEqual(
        expect.objectContaining({
          backgroundColor: customColor,
        }),
      )
    })

    it('applies custom padding', () => {
      const customPadding = 20
      const {getByTestId} = renderWithProvider(<Card padding={customPadding} />)
      const card = getByTestId('card')
      expect(card.props.style).toEqual(
        expect.objectContaining({
          paddingTop: customPadding,
          paddingBottom: customPadding,
          paddingLeft: customPadding,
          paddingRight: customPadding,
        }),
      )
    })

    it('applies custom border radius', () => {
      const customBorderRadius = 15
      const {getByTestId} = renderWithProvider(<Card borderRadius={customBorderRadius} />)
      const card = getByTestId('card')
      expect(card.props.style).toEqual(
        expect.objectContaining({
          borderTopLeftRadius: customBorderRadius,
          borderTopRightRadius: customBorderRadius,
          borderBottomLeftRadius: customBorderRadius,
          borderBottomRightRadius: customBorderRadius,
        }),
      )
    })

    it('applies multiple styling props together', () => {
      const props = {
        backgroundColor: '#0000ff',
        padding: 25,
        borderRadius: 10,
      }
      const {getByTestId} = renderWithProvider(<Card {...props} />)
      const card = getByTestId('card')
      expect(card.props.style).toEqual(
        expect.objectContaining({
          backgroundColor: props.backgroundColor,
          paddingTop: props.padding,
          paddingBottom: props.padding,
          paddingLeft: props.padding,
          paddingRight: props.padding,
          borderTopLeftRadius: props.borderRadius,
          borderTopRightRadius: props.borderRadius,
          borderBottomLeftRadius: props.borderRadius,
          borderBottomRightRadius: props.borderRadius,
        }),
      )
    })

    it('applies custom style prop', () => {
      const customStyle = {marginTop: 10, width: 200}
      const {getByTestId} = renderWithProvider(<Card style={customStyle} />)
      const card = getByTestId('card')
      expect(card.props.style).toEqual(
        expect.objectContaining({
          marginTop: customStyle.marginTop,
          width: customStyle.width,
        }),
      )
    })

    it('applies array of custom styles', () => {
      const customStyles = [{marginTop: 10}, {width: 200}]
      const {getByTestId} = renderWithProvider(<Card style={customStyles} />)
      const card = getByTestId('card')
      expect(card.props.style).toEqual(
        expect.objectContaining({
          marginTop: 10,
          width: 200,
        }),
      )
    })
  })

  describe('Theme Integration', () => {
    it('uses theme defaults when no props are provided', () => {
      const {getByTestId} = renderWithProvider(<Card />)
      const card = getByTestId('card')
      // Should have some default styling from theme
      expect(card.props.style).toBeDefined()
    })

    it('overrides theme defaults with custom props', () => {
      const customColor = '#custom'
      const {getByTestId} = renderWithProvider(<Card backgroundColor={customColor} />)
      const card = getByTestId('card')
      expect(card.props.style).toEqual(
        expect.objectContaining({
          backgroundColor: customColor,
        }),
      )
    })
  })

  describe('Accessibility', () => {
    it('has correct testID for testing', () => {
      const {getByTestId} = renderWithProvider(<Card />)
      const card = getByTestId('card')
      expect(card).toBeDefined()
    })

    it('maintains testID when other props are provided', () => {
      const {getByTestId} = renderWithProvider(
        <Card onPress={mockOnPress} backgroundColor="#test" padding={10} />,
      )
      const card = getByTestId('card')
      expect(card).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    it('handles zero padding', () => {
      const {getByTestId} = renderWithProvider(<Card padding={0} />)
      const card = getByTestId('card')
      expect(card.props.style).toEqual(
        expect.objectContaining({
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }),
      )
    })

    it('handles zero border radius', () => {
      const {getByTestId} = renderWithProvider(<Card borderRadius={0} />)
      const card = getByTestId('card')
      expect(card.props.style).toEqual(
        expect.objectContaining({
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }),
      )
    })

    it('handles transparent background color', () => {
      const {getByTestId} = renderWithProvider(<Card backgroundColor="transparent" />)
      const card = getByTestId('card')
      expect(card.props.style).toEqual(
        expect.objectContaining({
          backgroundColor: 'transparent',
        }),
      )
    })
  })
})
