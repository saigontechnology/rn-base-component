import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {Button} from '../Button/Button'
import {Text} from 'react-native'

describe('Button component', () => {
  const onPressMock = jest.fn()
  const imgUrl = 'https://kenh14cdn.com/203336854389633024/2023/1/17/photo-12-1673980290121902612775.jpeg'

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const {getByTestId, queryByTestId} = render(
      <Button title="Press me" testID="button" onPress={onPressMock} />,
    )
    const button = getByTestId('button')

    expect(button).toBeDefined()
    expect(queryByTestId('test-icon')).toBeNull()
  })

  it('renders correctly with icon prop', () => {
    const {getByTestId} = render(<Button title="Press me" iconSource={{uri: imgUrl}} />)
    const icon = getByTestId('test-icon')
    expect(icon).toBeDefined()
  })

  test('calls onLongPress prop when button is long pressed', () => {
    const onLongPressMock = jest.fn()
    const {getByTestId} = render(<Button title="Test Button" onLongPress={onLongPressMock} />)
    fireEvent(getByTestId('test-button'), 'longPress')
    expect(onLongPressMock).toHaveBeenCalled()
  })

  it('renders correctly with custom title', () => {
    const {getByTestId} = render(
      <Button
        testID="button"
        title={
          <>
            <Text>Title</Text>
            <Text>description</Text>
          </>
        }
      />,
    )
    const button = getByTestId('button')
    expect(button).toBeTruthy()
  })

  it('renders button without title', () => {
    const {getByTestId} = render(<Button testID="button" />)
    const button = getByTestId('button')
    expect(button).toBeTruthy()
  })

  it('renders text with correct textTransform style', () => {
    const {getByText} = render(<Button title="Test Text" uppercase={true} />)
    const text = getByText('Test Text')

    expect(text.props.style[0]?.textTransform).toBe('uppercase')
  })

  it('calls onPress callback on button press', () => {
    const {getByTestId} = render(<Button title="Press me" testID="button" onPress={onPressMock} />)
    const button = getByTestId('button')

    fireEvent.press(button)

    expect(onPressMock).toHaveBeenCalled()
  })

  it('disables button if disabled prop is true', () => {
    const {getByTestId} = render(<Button title="Press me" testID="button" onPress={onPressMock} disabled />)
    const button = getByTestId('button')

    fireEvent.press(button)

    expect(onPressMock).not.toHaveBeenCalled()
  })

  it('shows loading indicator when loading prop is true', () => {
    const {getByTestId} = render(<Button title="Press me" testID="button" onPress={onPressMock} loading />)
    const button = getByTestId('button')

    const loading = button.findByProps({testID: 'test-loading'})
    expect(loading).toBeDefined()
  })
})
