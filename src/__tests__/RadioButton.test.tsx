import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {RadioButton} from '../components'
import {StyleSheet} from 'react-native'
import {BaseProvider} from '../core/BaseProvider'

const renderWithProvider = (component: React.ReactElement) => render(<BaseProvider>{component}</BaseProvider>)

describe('RadioButton test', () => {
  const onPressMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const {getByTestId} = renderWithProvider(<RadioButton />)
    expect(getByTestId('container')).toBeDefined()
  })

  it('should call on press', () => {
    const {getByTestId} = renderWithProvider(<RadioButton onPress={onPressMock} />)
    const radioButton = getByTestId('bounceable')

    fireEvent.press(radioButton)
    expect(onPressMock).toHaveBeenCalled()
  })

  it('should change state when pressed', () => {
    const {getByTestId} = renderWithProvider(<RadioButton />)
    const radionButton = getByTestId('bounceable')
    const circle = getByTestId('circle')

    fireEvent.press(radionButton)

    const styles = StyleSheet.flatten(circle.props.style)

    expect(styles.backgroundColor).toBe('#004282')

    fireEvent.press(radionButton)
    const stylesAfterPress = StyleSheet.flatten(circle.props.style)
    expect(stylesAfterPress.backgroundColor).toBe('transparent')
  })

  it('should not change state when disabled', () => {
    const {getByTestId} = renderWithProvider(<RadioButton onPress={onPressMock} disabled={true} />)
    const radioButton = getByTestId('bounceable')

    fireEvent.press(radioButton)
    expect(onPressMock).not.toHaveBeenCalled()
  })

  it('should be active state when initial is set to true', () => {
    const {getByTestId} = renderWithProvider(<RadioButton initial={true} />)
    const circle = getByTestId('circle')

    expect(circle.props.style.backgroundColor).toBe('#004282')
  })

  it('should be remain state', () => {
    const {getByTestId} = renderWithProvider(<RadioButton isRemainActive={true} />)
    const radionButton = getByTestId('bounceable')
    const circle = getByTestId('circle')

    fireEvent.press(radionButton)
    expect(onPressMock).not.toHaveBeenCalled()

    expect(circle.props.style.backgroundColor).toBe('transparent')
  })
})
