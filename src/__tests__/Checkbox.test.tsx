import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {BOUNCE_EFFECT_IN, BOUNCE_EFFECT_OUT, Checkbox} from '../components'
import {ThemeProvider} from 'styled-components/native'
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

  it('should trigger bounceEffect on press', async () => {
    const {getByTestId} = renderComponent(<Checkbox />)
    const container = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent(container, 'pressIn')

    expect(icon.props.style[1].transform[0].scale).toEqual({value: BOUNCE_EFFECT_IN})
  })

  it('should trigger bounceOutEffect on press', () => {
    const {getByTestId} = renderComponent(<Checkbox />)
    const container = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent(container, 'pressOut')

    expect(icon.props.style[1].transform[0].scale).toEqual({value: BOUNCE_EFFECT_OUT})
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

  it('label should be null', () => {
    const {queryByTestId} = render(<Checkbox disableText={true} />)
    const label = queryByTestId('label')
    expect(label).toBeNull()
  })

  it('label should be set', () => {
    const {getByTestId} = render(<Checkbox label="checkbox text" />)
    const label = getByTestId('label')

    expect(label.props.children).toEqual('checkbox text')
  })
})
