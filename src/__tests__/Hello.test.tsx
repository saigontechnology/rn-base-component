import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import Hello from '../Hello'

describe('Hello component', () => {
  it('renders greeting text with given name and enthusiasm level', () => {
    const name = 'John'
    const enthusiasmLevel = 2
    const {getByText} = render(<Hello name={name} enthusiasmLevel={enthusiasmLevel} />)
    const greetingText = getByText(`Hello ${name}!!`)
    expect(greetingText).toBeDefined()
  })

  it('throws an error if enthusiasm level is 0 or less', () => {
    const name = 'John'
    const enthusiasmLevel = 0
    console.error = jest.fn()
    render(<Hello name={name} enthusiasmLevel={enthusiasmLevel} />)
    expect(console.error).toHaveBeenCalledWith('You could be a little more enthusiastic. :D')
  })

  it('increments enthusiasm level when the + button is pressed', () => {
    const name = 'John'
    const enthusiasmLevel = 2
    const {getByText} = render(<Hello name={name} enthusiasmLevel={enthusiasmLevel} />)
    const incrementButton = getByText('+')
    fireEvent.press(incrementButton)
    const greetingText = getByText(`Hello ${name}!!!`)
    expect(greetingText).toBeDefined()
  })

  it('decrements enthusiasm level when the - button is pressed', () => {
    const name = 'John'
    const enthusiasmLevel = 2
    const {getByText} = render(<Hello name={name} enthusiasmLevel={enthusiasmLevel} />)
    const decrementButton = getByText('-')
    fireEvent.press(decrementButton)
    const greetingText = getByText(`Hello ${name}!`)
    expect(greetingText).toBeDefined()
  })
})
