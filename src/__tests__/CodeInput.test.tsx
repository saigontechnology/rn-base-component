import React from 'react'
import {CodeInput} from '../components'
import {fireEvent, render} from '@testing-library/react-native'

describe('CodeInput', () => {
  test('calls onFulfill with the correct value when input is complete', () => {
    const onFulfill = jest.fn()
    const {getByTestId} = render(<CodeInput onSubmit={onFulfill} />)
    const textInput = getByTestId('input')

    fireEvent.changeText(textInput, '123456')
    expect(onFulfill).toHaveBeenCalledWith('123456')
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
