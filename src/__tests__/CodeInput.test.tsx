import React from 'react'
import {CodeInput} from '../components'
import {fireEvent, render} from '@testing-library/react-native'

describe('CodeInput', () => {
  test('calls onSubmit with the correct value when input is complete', () => {
    const onSubmit = jest.fn()
    const {getByTestId} = render(<CodeInput onSubmit={onSubmit} />)
    const textInput = getByTestId('input')

    fireEvent.changeText(textInput, '123456')
    expect(onSubmit).toHaveBeenCalledWith('123456')
  })

  test('calls onClear with the correct value when input is complete', () => {
    const onClear = jest.fn()
    const {getByTestId} = render(<CodeInput onClear={onClear} />)
    const textInput = getByTestId('input')

    fireEvent.changeText(textInput, '123456')
    fireEvent.changeText(textInput, '')
    expect(onClear).toHaveBeenCalled()
  })

  test('display correct default number of cells', () => {
    const {getAllByTestId} = render(<CodeInput />)

    const cells = getAllByTestId('cell')
    expect(cells.length).toBe(6)
  })

  test('display correct custom number of cells', () => {
    const {getAllByTestId} = render(<CodeInput length={4} />)

    const cells = getAllByTestId('cell')
    expect(cells.length).toBe(4)
  })
})
