import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import Checkbox from './Checkbox'

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
    const {getByTestId} = render(<Checkbox onPress={onPressMock} />)
    const checkbox = getByTestId('container')

    fireEvent.press(checkbox)
    expect(onPressMock).toHaveBeenCalled()
  })

  it('should change state when pressed', () => {
    const {getByTestId} = render(<Checkbox />)
    const checkbox = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent.press(checkbox)
    expect(icon.props.style.backgroundColor).toEqual('#ffc484')

    fireEvent.press(checkbox)
    expect(icon.props.style.backgroundColor).toEqual('transparent')
  })

  it('should not change state when disabled', () => {
    const {getByTestId} = render(<Checkbox disable={true} />)
    const checkbox = getByTestId('container')
    const icon = getByTestId('icon-container')

    fireEvent.press(checkbox)
    expect(icon.props.style.backgroundColor).toEqual('transparent')
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
