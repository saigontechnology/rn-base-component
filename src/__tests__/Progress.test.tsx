import React from 'react'
import {render} from '@testing-library/react-native'
import Progress from '../components/Progress/Progress'

describe('Progress', () => {
  it('should render Progress component correctly', () => {
    const {getByTestId} = render(<Progress />)
    const progressWrapper = getByTestId('progress-wrapper')
    expect(progressWrapper).toBeDefined()
  })

  it('should render with the given background color', () => {
    const {getByTestId} = render(<Progress backgroundColor="#ccc" />)
    const progressWrapper = getByTestId('progress-wrapper')
    expect(progressWrapper.props.style.backgroundColor).toEqual('#ccc')
  })

  it('should render with the given size', () => {
    const {getByTestId} = render(<Progress size={20} />)
    const progressWrapper = getByTestId('progress-wrapper')
    expect(progressWrapper.props.style.height).toEqual(20)
  })

  it('should render with the given border radius', () => {
    const {getByTestId} = render(<Progress borderRadius={8} />)
    const progressWrapper = getByTestId('progress-wrapper')
    expect(progressWrapper.props.style.borderRadius).toEqual(8)
  })

  it('should render with the given filled track color', () => {
    const {getByTestId} = render(<Progress filledTrackColor="#123456" />)
    const filledTrack = getByTestId('filled-track')
    expect(filledTrack.props.style.backgroundColor).toEqual('#123456')
  })

  it('should render with the given progress value', () => {
    const {getByTestId} = render(<Progress value={50} />)
    const filledTrack = getByTestId('filled-track')
    expect(filledTrack.props.style.transform[0].translateX).toEqual(-200)
  })

  //   it('should animate progress bar for indeterminate progress', () => {
  //     const {getByTestId} = render(<Progress isIndeterminateProgress={true} />)
  //     const filledTrack = getByTestId('filled-track')
  //     expect(filledTrack).toHaveStyle({
  //       transform: [{translateX: expect.any(Object)}, {scaleX: expect.any(Object)}],
  //     })
  //   })
})
