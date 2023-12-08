import React from 'react'
import {render} from '@testing-library/react-native'
import Progress from '../components/Progress/Progress'
import {responsiveHeight} from '../helpers/metrics'
import {ThemeProvider} from 'styled-components/native'
import {theme} from '../theme'

const renderElement = (Component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{Component}</ThemeProvider>)

describe('Progress', () => {
  it('renders correctly', () => {
    const {getByTestId} = renderElement(<Progress />)
    const progressWrapper = getByTestId('progress-wrapper')
    const filledTrack = getByTestId('filled-track')

    expect(progressWrapper).toBeTruthy()
    expect(filledTrack).toBeTruthy()
  })

  it('renders with default props', () => {
    const {getByTestId} = renderElement(<Progress />)
    const progressWrapper = getByTestId('progress-wrapper')
    const filledTrack = getByTestId('filled-track')

    expect(progressWrapper.props.backgroundColor).toBe('#3f3f46')
    expect(progressWrapper.props.borderRadius).toBe(0)
    expect(progressWrapper.props.width).toBeUndefined()
    expect(progressWrapper.props.size).toBe(responsiveHeight(16))

    expect(filledTrack.props.style[1].backgroundColor).toBe('#0e7490')
    expect(filledTrack.props.style[1].borderRadius).toBe(0)
    expect(filledTrack.props.style[1].width).toBe(0)
    expect(filledTrack.props.style[1].height).toBe(responsiveHeight(16))
  })

  it('renders with custom props', () => {
    const {getByTestId} = renderElement(
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

    expect(filledTrack.props.style[1].backgroundColor).toBe('red')
    expect(filledTrack.props.style[1].borderRadius).toBe(8)
    expect(filledTrack.props.style[1].width).toBe(0)
    expect(filledTrack.props.style[1].height).toBe(20)
  })
})
