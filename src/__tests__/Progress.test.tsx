import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import Progress from '../components/Progress/Progress'
import {StyleSheet} from 'react-native'

describe('Progress', () => {
  it('should render Progress component correctly', () => {
    const {getByTestId} = render(<Progress />)
    const progressWrapper = getByTestId('progress-wrapper')
    expect(progressWrapper).toBeDefined()
  })

  it('should render with the given background color', () => {
    const {getByTestId} = render(<Progress backgroundColor="#ccc" />)
    const progressWrapper = getByTestId('progress-wrapper')
    const styles = StyleSheet.flatten(progressWrapper.props.style)
    expect(styles.backgroundColor).toEqual('#ccc')
  })

  it('should render with the given size', () => {
    const {getByTestId} = render(<Progress size={20} />)
    const progressWrapper = getByTestId('progress-wrapper')
    const styles = StyleSheet.flatten(progressWrapper.props.style)
    expect(styles.height).toEqual(20)
  })

  it('should render with the given border radius', () => {
    const {getByTestId} = render(<Progress borderRadius={8} />)
    const progressWrapper = getByTestId('progress-wrapper')
    const styles = StyleSheet.flatten(progressWrapper.props.style)
    expect(styles.borderRadius).toEqual(8)
  })

  it('should render with the given filled track color', () => {
    const {getByTestId} = render(<Progress filledTrackColor="#123456" />)
    const filledTrack = getByTestId('filled-track')
    const styles = StyleSheet.flatten(filledTrack.props.style)
    expect(styles.backgroundColor).toEqual('#123456')
  })

  it('should render with the given progress value', () => {
    const {getByTestId} = render(<Progress value={50} />)
    const filledTrack = getByTestId('filled-track')
    const styles = StyleSheet.flatten(filledTrack.props.style)
    expect(styles.transform[0].translateX).toEqual(-750)
  })

  it('should animate progress bar for indeterminate progress', () => {
    const {getByTestId} = render(<Progress isIndeterminateProgress={true} />)
    const filledTrack = getByTestId('filled-track')
    const styles = StyleSheet.flatten(filledTrack.props.style)
    expect({transform: styles.transform}).toEqual({
      transform: [{translateX: expect.any(Number)}, {scaleX: expect.any(Number)}],
    })
  })

  it('should have correct layout render', async () => {
    const {getByTestId} = render(<Progress />)
    const progressWrapper = getByTestId('progress-wrapper')
    const filledTrack = getByTestId('filled-track')
    expect(filledTrack.props.style.width).toEqual(0)

    fireEvent(progressWrapper, 'layout', {
      nativeEvent: {
        layout: {
          width: 150,
        },
      },
    })

    expect(filledTrack.props.style.width).toEqual(150)
  })
})
