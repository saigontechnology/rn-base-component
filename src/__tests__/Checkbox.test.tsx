import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {ThemeProvider} from 'styled-components/native'
import Checkbox from '../components/Checkbox/Checkbox'
import {BOUNCE_EFFECT_IN, BOUNCE_EFFECT_OUT} from '../components/Checkbox/constants'
import {theme} from '../theme'

jest.mock('../hooks/useTheme', () => ({
  useTheme: jest.fn(() => ({
    components: {
      Checkbox: {
        fillColor: '#0B0B0B',
        unfillColor: '#00000000',
      },
    },
  })),
}))

const renderComponent = (Component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{Component}</ThemeProvider>)

describe('Checkbox test', () => {
  const onPressMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should trigger bounceInEffect on press', () => {
    const {getByTestId} = renderComponent(<Checkbox />)
    const container = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent(container, 'pressIn')

    console.log(icon.props.style[1].transform[0])

    expect(icon.props.style[1].transform[0].scale).toEqual(BOUNCE_EFFECT_IN)
  })

  it('should trigger bounceOutEffect on press', () => {
    const {getByTestId} = renderComponent(<Checkbox />)
    const container = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent(container, 'pressOut')

    expect(icon.props.style[1].transform[0].scale).toEqual(BOUNCE_EFFECT_OUT)
  })

  it('should render correctly', () => {
    const {getByTestId} = renderComponent(<Checkbox />)
    expect(getByTestId('container')).toBeDefined()
  })

  it('should call on press', () => {
    const {getByTestId} = renderComponent(<Checkbox onChange={onPressMock} />)
    const checkbox = getByTestId('container')

    fireEvent.press(checkbox)
    expect(onPressMock).toHaveBeenCalled()
  })

  it('should change state when pressed', () => {
    const {getByTestId} = renderComponent(<Checkbox fillColor="#0B0B0B" unfillColor="#00000000" />)
    const checkbox = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent.press(checkbox)
    expect(icon.props.style[0].backgroundColor).toEqual('#0B0B0B')

    fireEvent.press(checkbox)
    expect(icon.props.style[0].backgroundColor).toEqual('#00000000')
  })

  it('should not change state when disabled', () => {
    const {getByTestId} = renderComponent(<Checkbox disabled={true} unfillColor="#00000000" />)
    const checkbox = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent.press(checkbox)
    expect(icon.props.style[0].backgroundColor).toEqual('#00000000')
  })

  it('text should be null', () => {
    const {queryByTestId} = renderComponent(<Checkbox disableText={true} />)
    const text = queryByTestId('text')

    expect(text).toBeNull()
  })

  it('text should be set', () => {
    const {getByTestId} = renderComponent(<Checkbox text="checkbox text" />)
    const text = getByTestId('text')

    expect(text.props.children).toEqual('checkbox text')
  })
})
