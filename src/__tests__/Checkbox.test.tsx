import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {Checkbox} from '../components'
import {BOUNCE_EFFECT_OUT} from '../components/Checkbox/constants'

describe('Checkbox test', () => {
  const onPressMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should trigger bounceInEffect on press', () => {
    const {getByTestId} = render(<Checkbox />)
    const container = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent(container, 'pressIn')

    expect(icon.props.style.transform[0].scale).toEqual(BOUNCE_EFFECT_OUT)
  })

  it('should trigger bounceOutEffect on press', () => {
    const {getByTestId} = render(<Checkbox />)
    const container = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent(container, 'pressOut')

    expect(icon.props.style.transform[0].scale).toEqual(BOUNCE_EFFECT_OUT)
  })

  it('should render correctly', () => {
    const {getByTestId} = render(<Checkbox />)
    expect(getByTestId('container')).toBeDefined()
  })

  it('should call on press', () => {
    const {getByTestId} = render(<Checkbox onChange={onPressMock} />)
    const checkbox = getByTestId('container')

    fireEvent.press(checkbox)
    expect(onPressMock).toHaveBeenCalled()
  })

  it('should change state when pressed', () => {
    const {getByTestId} = render(<Checkbox fillColor="#0B0B0B" unfillColor="#00000000" />)
    const checkbox = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent.press(checkbox)
    expect(icon.props.style.backgroundColor).toEqual('#0B0B0B')

    fireEvent.press(checkbox)
    expect(icon.props.style.backgroundColor).toEqual('#00000000')
  })

  it('should not change state when disabled', () => {
    const {getByTestId} = render(<Checkbox disabled={true} unfillColor="#00000000" />)
    const checkbox = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent.press(checkbox)
    expect(icon.props.style.backgroundColor).toEqual('#00000000')
  })

  it('label should be null', () => {
    const {queryByTestId} = render(<Checkbox disableText={true} />)
    const label = queryByTestId('label')

    expect(label).toBeNull()
  })

  it('label should be set', () => {
    const {getByTestId} = render(<Checkbox label="checkbox text" />)
    const label = getByTestId('label')

    expect(label.props.children).toEqual('checkbox label')
  })
})
