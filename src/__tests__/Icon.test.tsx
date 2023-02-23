import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {Icon} from '../Icon/Icon'

describe('Icon Component', () => {
  const onPressMock = jest.fn()
  const onLongPressMock = jest.fn()
  const imgUrl = 'https://kenh14cdn.com/203336854389633024/2023/1/17/photo-12-1673980290121902612775.jpeg'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Icon component renders correctly', () => {
    const {getByTestId} = render(<Icon source={{uri: imgUrl}} testID="icon" />)
    const icon = getByTestId('icon')

    const iconImage = getByTestId('icon-image')
    expect(iconImage).toBeTruthy()

    expect(icon).toBeDefined()
  })

  it('calls onPress prop when pressed', () => {
    const {getByTestId} = render(<Icon source={{uri: imgUrl}} onPress={onPressMock} testID="icon" />)
    const icon = getByTestId('icon')

    fireEvent.press(icon)

    expect(onPressMock).toHaveBeenCalled()
  })

  it('calls onLongPress prop when long pressed', () => {
    const {getByTestId} = render(<Icon source={{uri: imgUrl}} onLongPress={onLongPressMock} testID="icon" />)
    const icon = getByTestId('icon')

    fireEvent(icon, 'longPress')

    expect(onLongPressMock).toHaveBeenCalled()
  })

  it('does not call onPress prop when disabled', () => {
    const {getByTestId} = render(<Icon source={{uri: imgUrl}} onPress={onPressMock} testID="icon" disabled />)
    const icon = getByTestId('icon')

    fireEvent.press(icon)

    expect(onPressMock).not.toHaveBeenCalled()
  })

  it('does not call onLongPress prop when disabled', () => {
    const {getByTestId} = render(
      <Icon source={{uri: imgUrl}} onLongPress={onLongPressMock} testID="icon" disabled />,
    )
    const icon = getByTestId('icon')

    fireEvent(icon, 'longPress')

    expect(onLongPressMock).not.toHaveBeenCalled()
  })
})
