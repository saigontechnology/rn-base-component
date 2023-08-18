import {fireEvent, render} from '@testing-library/react-native'
import React from 'react'
import {Switch} from '../components'

describe('Switch', () => {
  const value = true
  const onValueChange = jest.fn()

  it('renders without errors', () => {
    const {getByTestId} = render(<Switch value={value} onValueChange={onValueChange} />)
    const switchContainer = getByTestId('switch-container')

    expect(switchContainer).toBeDefined()
  })

  it('calls onValueChange when pressed', () => {
    const {getByTestId} = render(<Switch value={value} onValueChange={onValueChange} />)
    const switchContainer = getByTestId('switch-container')

    fireEvent.press(switchContainer)
    expect(onValueChange).toHaveBeenCalled()
  })

  it('renders with the correct track color', () => {
    const trackColor = 'red'
    const {getByTestId} = render(
      <Switch value={value} onValueChange={onValueChange} trackColor={trackColor} />,
    )
    const trackActive = getByTestId('track-active')
    const trackInActive = getByTestId('track-in-active')

    expect(trackActive.props.style.backgroundColor).toBe(trackColor)
    expect(trackInActive.props.style.backgroundColor).toBe(trackColor)
  })

  it('renders with the correct object track color', () => {
    const trackColor = {active: 'red', inActive: 'grey'}
    const {getByTestId} = render(
      <Switch value={value} onValueChange={onValueChange} trackColor={trackColor} />,
    )
    const trackActive = getByTestId('track-active')
    const trackInActive = getByTestId('track-in-active')

    expect(trackActive.props.style.backgroundColor).toBe(trackColor.active)
    expect(trackInActive.props.style.backgroundColor).toBe(trackColor.inActive)
  })

  it('renders with the thembSize prop', () => {
    const thumbSize = 20
    const {getByTestId} = render(<Switch value={value} onValueChange={onValueChange} thumbSize={thumbSize} />)
    const trackActive = getByTestId('track-active')
    const trackInActive = getByTestId('track-in-active')
    const thumb = getByTestId('thumb')

    expect(trackActive.props.thumbSize).toBe(thumbSize)
    expect(trackInActive.props.thumbSize).toBe(thumbSize)
    expect(thumb.props.thumbSize).toBe(thumbSize)
  })

  it('renders with the thumbColor prop', () => {
    const thumbColor = 'red'
    const {getByTestId} = render(
      <Switch value={value} onValueChange={onValueChange} thumbColor={thumbColor} />,
    )
    const thumb = getByTestId('thumb')

    expect(thumb.props.thumbColor).toBe(thumbColor)
  })

  it('disables the component when disabled prop is true', () => {
    const {getByTestId} = render(<Switch value={value} onValueChange={onValueChange} disabled />)
    const switchContainer = getByTestId('switch-container')

    fireEvent.press(switchContainer)
    expect(onValueChange).toHaveBeenCalled()
  })

  it('renders with the correct text inside for active and inactive states', () => {
    const textInside = {
      active: 'Active',
      inActive: 'Inactive',
    }
    const {getByText} = render(
      <Switch value={value} onValueChange={onValueChange} textInside={textInside} variant="inside" />,
    )
    const labelActive = getByText(textInside.active)
    const labelInActive = getByText(textInside.inActive)

    expect(labelActive).toBeDefined()
    expect(labelInActive).toBeDefined()
  })

  it('renders with custom text inside color', () => {
    const textInsideColor = {
      active: 'green',
      inActive: 'red',
    }
    const {getByTestId} = render(
      <Switch
        value={value}
        onValueChange={onValueChange}
        textInsideColor={textInsideColor}
        variant="inside"
      />,
    )
    const labelActive = getByTestId('label-active')
    const labelInActive = getByTestId('label-in-active')

    expect(labelActive.props.color).toBe(textInsideColor.active)
    expect(labelInActive.props.color).toBe(textInsideColor.inActive)
  })

  it('renders with the trackPaddingInside prop with variant inside', () => {
    const trackPaddingInside = 4
    const {getByTestId} = render(
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackPaddingInside={trackPaddingInside}
        variant="inside"
      />,
    )
    const switchContainer = getByTestId('switch-container')

    expect(switchContainer.props.trackMargin).toBe(trackPaddingInside)
  })
})
