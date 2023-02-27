import React from 'react'
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import TextInput from '../TextInput/TextInput'
import {View} from 'react-native'

describe('TextInput component', () => {
  const onChangeTextMock = jest.fn()
  const onPressMock = jest.fn()
  const imgUrl = 'https://kenh14cdn.com/203336854389633024/2023/1/17/photo-12-1673980290121902612775.jpeg'

  afterEach(() => {
    onChangeTextMock.mockClear()
    onPressMock.mockClear()
  })

  it('renders correctly with default props', () => {
    const {getByTestId} = render(<TextInput testID="test-textInput" />)
    const textInput = getByTestId('test-textInput')
    expect(textInput).toBeDefined()
  })

  it('renders correctly with label props', () => {
    const {getByTestId} = render(<TextInput label="Test TextInput" />)
    const title = getByTestId('test-title')
    expect(title).toBeTruthy()
  })

  it('renders correctly with isRequire props', () => {
    const {getByTestId} = render(<TextInput isRequire label="Test TextInput" />)
    const startText = getByTestId('test-startText')
    expect(startText).toBeTruthy()
  })

  it('renders left and right components', () => {
    const {getByTestId} = render(
      <TextInput
        testID="test-textInput"
        leftComponent={<View testID="test-leftComponent" />}
        rightComponent={<View testID="test-rightComponent" />}
      />,
    )
    const leftComponent = getByTestId('test-leftComponent')
    expect(leftComponent).toBeTruthy()

    const rightComponent = getByTestId('test-rightComponent')
    expect(rightComponent).toBeTruthy()
  })

  it('calls the onChangeText callback when the text changes', () => {
    const {getByTestId} = render(<TextInput testID="test-textInput" onChangeText={onChangeTextMock} />)
    const textInput = getByTestId('test-textInput')
    fireEvent.changeText(textInput, 'hello world')
    expect(onChangeTextMock).toHaveBeenCalledWith('hello world')
  })

  it('should render multiline TextInput', () => {
    const {getByTestId} = render(<TextInput testID="test-textInput" multiline={true} />)
    const input = getByTestId('test-textInput')
    expect(input.props.multiline).toBeTruthy()
  })

  it('displays the error message when errorText is provided', () => {
    const {getByText} = render(<TextInput testID="test-textInput" errorText="This field is required" />)
    const errorText = getByText('This field is required')
    expect(errorText).toBeDefined()
  })

  it('should render the component', () => {
    const {getByTestId} = render(<TextInput.Flat label="Username" value="JohnDoe" />)
    const textInputFlat = getByTestId('test-textInputFlat')
    expect(textInputFlat).toBeTruthy()
  })

  it('should call onChangeText when input changes', () => {
    const {getByTestId} = render(<TextInput.Flat label="Username" value="" onChangeText={onChangeTextMock} />)
    const textInputFlat = getByTestId('test-textInputFlat')
    fireEvent.changeText(textInputFlat, 'JohnDoe')
    expect(onChangeTextMock).toHaveBeenCalledWith('JohnDoe')
  })

  it('should call onFocus when input is focused', () => {
    const onFocus = jest.fn()
    const {getByTestId} = render(<TextInput.Flat label="Username" value="" onFocus={onFocus} />)
    const textInputFlat = getByTestId('test-textInputFlat')
    fireEvent(textInputFlat, 'focus')
    expect(onFocus).toHaveBeenCalled()
  })

  it('should call onBlur when input loses focus', () => {
    const onBlur = jest.fn()
    const {getByTestId} = render(<TextInput.Flat label="Username" value="" onBlur={onBlur} />)
    const textInputFlat = getByTestId('test-textInputFlat')
    fireEvent(textInputFlat, 'blur')
    expect(onBlur).toHaveBeenCalled()
  })

  it('should set containerHeightRef.current when getHeight is called', async () => {
    const containerHeight = 100
    const mockLayoutChangeEvent = {
      nativeEvent: {layout: {height: containerHeight}},
    }
    const getHeight = jest.fn()

    const {getByTestId} = render(
      <TextInput.Flat testID="test-textInputFlat" value="Test TextInputFlat" onLayout={getHeight} />,
    )
    const textInput = getByTestId('test-textInputFlat')
    await waitFor(() => textInput.props.onLayout(mockLayoutChangeEvent))

    expect(getHeight).toHaveBeenCalledTimes(1)
    expect(getHeight).toHaveBeenCalledWith(mockLayoutChangeEvent)
    expect(textInput.props.onLayout).toEqual(getHeight)
    expect(textInput).toBeDefined()
  })

  it('renders correctly', () => {
    const source = {uri: imgUrl}
    const size = 24
    const color = 'red'
    const resizeMode = 'contain'
    const iconContainerStyle = {backgroundColor: 'white'}
    const iconStyle = {borderWidth: 1}
    const onPress = jest.fn()

    const {getByTestId} = render(
      <TextInput.Icon
        source={source}
        size={size}
        color={color}
        resizeMode={resizeMode}
        iconContainerStyle={iconContainerStyle}
        iconStyle={iconStyle}
        onPress={onPress}
      />,
    )

    const iconContainer = getByTestId('icon-container')

    expect(iconContainer.props.style[1].backgroundColor).toBe('white')
    expect(iconContainer.props.children.props.source).toBe(source)
    expect(iconContainer.props.children.props.size).toBe(size)
    expect(iconContainer.props.children.props.color).toBe(color)
    expect(iconContainer.props.children.props.resizeMode).toBe(resizeMode)
    expect(iconContainer.props.children.props.style.borderWidth).toBe(1)
  })

  it('calls onPress when pressed', () => {
    const {getByTestId} = render(<TextInput.Icon source={{uri: imgUrl}} onPress={onPressMock} />)

    const icon = getByTestId('icon')
    fireEvent.press(icon)

    expect(onPressMock).toHaveBeenCalled()
  })

  it('should render with default onPress', () => {
    const {getByTestId} = render(<TextInput.Icon source={{uri: imgUrl}} onPress={undefined} />)
    const icon = getByTestId('icon')
    fireEvent.press(icon)
    expect(onPressMock).not.toHaveBeenCalled()
  })
})
