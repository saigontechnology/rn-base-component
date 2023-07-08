import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import Checkbox from '../components/Checkbox/Checkbox'

describe('Checkbox test', () => {
  const onPressMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
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

  it('text should be null', () => {
    const {queryByTestId} = render(<Checkbox disableText={true} />)
    const text = queryByTestId('text')

    expect(text).toBeNull()
  })

  it('text should be set', () => {
    const {getByTestId} = render(<Checkbox text="checkbox text" />)
    const text = getByTestId('text')

    expect(text.props.children).toEqual('checkbox text')
  })
})
