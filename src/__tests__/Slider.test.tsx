import React from 'react'
import {Slider} from '../components'
import {render, fireEvent} from '@testing-library/react-native'

describe('Slider Component', () => {
  test('renders correctly', () => {
    const {getByTestId} = render(<Slider />)
    const sliderComponent = getByTestId('slider-component')
    expect(sliderComponent).toBeDefined()
  })

  test('calls onValueChange when sliding', () => {
    const onValueChangeMock = jest.fn()
    const {getByTestId} = render(<Slider onValueChange={onValueChangeMock} />)

    // Simulate a slide event (you may need to adjust the coordinates)
    fireEvent.apply(getByTestId('slider'), {
      nativeEvent: {changedTouches: [{locationX: 50}]},
    })

    // Ensure onValueChange has been called
    expect(onValueChangeMock).toHaveBeenCalled()
  })

  test('show correct track point', () => {
    const {getByTestId} = render(<Slider showTrackPoint={true} sliderWidth={100} />)
    const trackPoints = getByTestId('track-point')
    expect(trackPoints).toBeDefined()
  })

  test('handles tapToSeek properly', () => {
    const onValueChangeMock = jest.fn()
    const {getByTestId} = render(<Slider tapToSeek onValueChange={onValueChangeMock} />)

    // Simulate a tap event (you may need to adjust the coordinates)
    fireEvent.press(getByTestId('slider'))

    // Ensure onValueChange has been called
    expect(onValueChangeMock).toHaveBeenCalled()
  })
})
