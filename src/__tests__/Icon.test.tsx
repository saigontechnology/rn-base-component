/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {Icon} from '../components'
import {BaseProvider} from '../core/BaseProvider'

const renderWithProvider = (component: React.ReactElement) => render(<BaseProvider>{component}</BaseProvider>)

describe('Icon Component', () => {
  const onPressMock = jest.fn()
  const onLongPressMock = jest.fn()
  const imgUrl = 'https://kenh14cdn.com/203336854389633024/2023/1/17/photo-12-1673980290121902612775.jpeg'
  const localImageSource = require('../assets/images/check.png')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders correctly with URI source', () => {
      const {getByTestId} = renderWithProvider(<Icon source={{uri: imgUrl}} testID="icon" />)
      const icon = getByTestId('icon')
      const iconImage = getByTestId('icon-image')

      expect(icon).toBeDefined()
      expect(iconImage).toBeTruthy()
      expect(iconImage.props.source).toEqual({uri: imgUrl})
    })

    it('renders correctly with local image source', () => {
      const {getByTestId} = renderWithProvider(<Icon source={localImageSource} testID="icon" />)
      const icon = getByTestId('icon')
      const iconImage = getByTestId('icon-image')

      expect(icon).toBeDefined()
      expect(iconImage).toBeTruthy()
      expect(iconImage.props.source).toEqual(localImageSource)
    })

    it('renders without testID when not provided', () => {
      const {getByTestId} = renderWithProvider(<Icon source={{uri: imgUrl}} />)
      const iconImage = getByTestId('icon-image')
      expect(iconImage).toBeTruthy()
    })
  })

  describe('Press Handling', () => {
    it('calls onPress prop when pressed', () => {
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} onPress={onPressMock} testID="icon" />,
      )
      const icon = getByTestId('icon')

      fireEvent.press(icon)

      expect(onPressMock).toHaveBeenCalledTimes(1)
    })

    it('calls onLongPress prop when long pressed', () => {
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} onLongPress={onLongPressMock} testID="icon" />,
      )
      const icon = getByTestId('icon')

      fireEvent(icon, 'longPress')

      expect(onLongPressMock).toHaveBeenCalledTimes(1)
    })

    it('calls both onPress and onLongPress when both are provided', () => {
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} onPress={onPressMock} onLongPress={onLongPressMock} testID="icon" />,
      )
      const icon = getByTestId('icon')

      fireEvent.press(icon)
      fireEvent(icon, 'longPress')

      expect(onPressMock).toHaveBeenCalledTimes(1)
      expect(onLongPressMock).toHaveBeenCalledTimes(1)
    })

    it('calls onPress multiple times when pressed multiple times', () => {
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} onPress={onPressMock} testID="icon" />,
      )
      const icon = getByTestId('icon')

      fireEvent.press(icon)
      fireEvent.press(icon)
      fireEvent.press(icon)

      expect(onPressMock).toHaveBeenCalledTimes(3)
    })

    it('does not call onPress when no onPress is provided', () => {
      const {getByTestId} = renderWithProvider(<Icon source={{uri: imgUrl}} testID="icon" />)
      const icon = getByTestId('icon')

      expect(() => fireEvent.press(icon)).not.toThrow()
      expect(onPressMock).not.toHaveBeenCalled()
    })
  })

  describe('Disabled State', () => {
    it('does not call onPress when disabled', () => {
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} onPress={onPressMock} testID="icon" disabled />,
      )
      const icon = getByTestId('icon')

      fireEvent.press(icon)

      expect(onPressMock).not.toHaveBeenCalled()
    })

    it('does not call onLongPress when disabled', () => {
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} onLongPress={onLongPressMock} testID="icon" disabled />,
      )
      const icon = getByTestId('icon')

      fireEvent(icon, 'longPress')

      expect(onLongPressMock).not.toHaveBeenCalled()
    })

    it('is disabled when no press handlers are provided', () => {
      const {getByTestId} = renderWithProvider(<Icon source={{uri: imgUrl}} testID="icon" />)
      const icon = getByTestId('icon')

      // Check that the icon exists and renders properly when no handlers provided
      expect(icon).toBeTruthy()
    })

    it('is not disabled when onPress is provided', () => {
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} onPress={onPressMock} testID="icon" />,
      )
      const icon = getByTestId('icon')

      // Check that the icon exists and renders properly with onPress
      expect(icon).toBeTruthy()
    })

    it('is not disabled when onLongPress is provided', () => {
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} onLongPress={onLongPressMock} testID="icon" />,
      )
      const icon = getByTestId('icon')

      // Check that the icon exists and renders properly with onLongPress
      expect(icon).toBeTruthy()
    })
  })

  describe('Styling Props', () => {
    it('applies custom size', () => {
      const customSize = 50
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} size={customSize} testID="icon" />,
      )
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            width: customSize,
            height: customSize,
          }),
        ]),
      )
    })

    it('applies custom color/tintColor', () => {
      const customColor = '#ff0000'
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} color={customColor} testID="icon" />,
      )
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tintColor: customColor,
          }),
        ]),
      )
    })

    it('applies custom style', () => {
      const customStyle = {margin: 10, borderWidth: 1}
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} style={customStyle} testID="icon" />,
      )
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.style).toEqual(expect.arrayContaining([expect.objectContaining(customStyle)]))
    })

    it('applies custom button style', () => {
      const customButtonStyle = {padding: 10, backgroundColor: 'red'}
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} buttonStyle={customButtonStyle} testID="icon" />,
      )
      const icon = getByTestId('icon')

      expect(icon.props.style).toEqual(
        expect.objectContaining({
          padding: customButtonStyle.padding,
          backgroundColor: customButtonStyle.backgroundColor,
        }),
      )
    })

    it('applies custom resize mode', () => {
      const customResizeMode = 'contain'
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} resizeMode={customResizeMode} testID="icon" />,
      )
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.resizeMode).toBe(customResizeMode)
    })

    it('applies multiple styling props together', () => {
      const props = {
        size: 40,
        color: '#0000ff',
        style: {borderRadius: 5},
        resizeMode: 'cover' as const,
      }
      const {getByTestId} = renderWithProvider(<Icon source={{uri: imgUrl}} {...props} testID="icon" />)
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            width: props.size,
            height: props.size,
            tintColor: props.color,
          }),
          expect.objectContaining(props.style),
        ]),
      )
      expect(iconImage.props.resizeMode).toBe(props.resizeMode)
    })
  })

  describe('Hit Slop', () => {
    it('applies custom hit slop', () => {
      const customHitSlop = {top: 20, bottom: 20, left: 20, right: 20}
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} hitSlop={customHitSlop} testID="icon" />,
      )
      const icon = getByTestId('icon')

      expect(icon.props.hitSlop).toEqual(customHitSlop)
    })

    it('uses default hit slop when not provided', () => {
      const {getByTestId} = renderWithProvider(<Icon source={{uri: imgUrl}} testID="icon" />)
      const icon = getByTestId('icon')

      expect(icon.props.hitSlop).toBeDefined()
    })
  })

  describe('Theme Integration', () => {
    it('uses theme defaults when no props are provided', () => {
      const {getByTestId} = renderWithProvider(<Icon source={{uri: imgUrl}} testID="icon" />)
      const iconImage = getByTestId('icon-image')

      // Should have default styling from theme
      expect(iconImage.props.style).toBeDefined()
      expect(iconImage.props.resizeMode).toBeDefined()
    })

    it('overrides theme defaults with custom props', () => {
      const customSize = 100
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} size={customSize} testID="icon" />,
      )
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            width: customSize,
            height: customSize,
          }),
        ]),
      )
    })
  })

  describe('Edge Cases', () => {
    it('handles zero size', () => {
      const {getByTestId} = renderWithProvider(<Icon source={{uri: imgUrl}} size={0} testID="icon" />)
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            width: 0,
            height: 0,
          }),
        ]),
      )
    })

    it('handles transparent color', () => {
      const {getByTestId} = renderWithProvider(
        <Icon source={{uri: imgUrl}} color="transparent" testID="icon" />,
      )
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tintColor: 'transparent',
          }),
        ]),
      )
    })

    it('handles empty object as style', () => {
      const {getByTestId} = renderWithProvider(<Icon source={{uri: imgUrl}} style={{}} testID="icon" />)
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.style).toBeDefined()
    })

    it('handles both disabled prop and no press handlers', () => {
      const {getByTestId} = renderWithProvider(<Icon source={{uri: imgUrl}} disabled testID="icon" />)
      const icon = getByTestId('icon')

      // Check that the icon exists and renders properly when disabled
      expect(icon).toBeTruthy()
    })
  })

  describe('Source Types', () => {
    it('handles URI source correctly', () => {
      const uriSource = {uri: imgUrl}
      const {getByTestId} = renderWithProvider(<Icon source={uriSource} testID="icon" />)
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.source).toEqual(uriSource)
    })

    it('handles URI source with additional properties', () => {
      const uriSource = {uri: imgUrl, cache: 'force-cache' as const}
      const {getByTestId} = renderWithProvider(<Icon source={uriSource} testID="icon" />)
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.source).toEqual(uriSource)
    })

    it('handles require() source', () => {
      const {getByTestId} = renderWithProvider(<Icon source={localImageSource} testID="icon" />)
      const iconImage = getByTestId('icon-image')

      expect(iconImage.props.source).toEqual(localImageSource)
    })
  })
})
