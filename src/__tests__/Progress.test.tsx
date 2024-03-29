import React from 'react'
import {render} from '@testing-library/react-native'
import Progress from '../components/Progress/Progress'
import {responsiveHeight} from '../helpers/metrics'

describe('Progress', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<Progress />)
    const progressWrapper = getByTestId('progress-wrapper')
    const filledTrack = getByTestId('filled-track')

    expect(progressWrapper).toBeTruthy()
    expect(filledTrack).toBeTruthy()
  })

  it('renders with default props', () => {
    const {getByTestId} = render(<Progress />)
    const progressWrapper = getByTestId('progress-wrapper')
    const filledTrack = getByTestId('filled-track')

    expect(progressWrapper.props.backgroundColor).toBe('#3f3f46')
    expect(progressWrapper.props.borderRadius).toBe(0)
    expect(progressWrapper.props.width).toBeUndefined()
    expect(progressWrapper.props.size).toBe(responsiveHeight(16))

    expect(filledTrack.props.style.backgroundColor).toBe('#0e7490')
    expect(filledTrack.props.style.borderRadius).toBe(0)
    expect(filledTrack.props.style.width).toBe(0)
    expect(filledTrack.props.style.height).toBe(responsiveHeight(16))
  })

  it('renders with custom props', () => {
    const {getByTestId} = render(
      <Progress
        value={50}
        size={20}
        borderRadius={8}
        filledTrackColor="red"
        backgroundColor="blue"
        width={200}
      />,
    )
    const progressWrapper = getByTestId('progress-wrapper')
    const filledTrack = getByTestId('filled-track')

    expect(progressWrapper.props.backgroundColor).toBe('blue')
    expect(progressWrapper.props.borderRadius).toBe(8)
    expect(progressWrapper.props.width).toBe(200)
    expect(progressWrapper.props.size).toBe(20)

    expect(filledTrack.props.style.backgroundColor).toBe('red')
    expect(filledTrack.props.style.borderRadius).toBe(8)
    expect(filledTrack.props.style.width).toBe(0)
    expect(filledTrack.props.style.height).toBe(20)
  })

  it('should animate progress when isIndeterminateProgress is true', async () => {
    const {getByTestId} = render(<Progress isIndeterminateProgress={true} />)

    const filledTrack = getByTestId('filled-track')
    const initialTranslateX = filledTrack.props.style.transform[0].translateX

    expect(initialTranslateX).not.toBeUndefined()
  })
})
