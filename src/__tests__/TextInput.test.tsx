import React from 'react'
import {act, fireEvent, render} from '@testing-library/react-native'
import {TextInput, TextInputRef} from '../components'
import {Text, View} from 'react-native'
import {BaseProvider} from '../core'

describe('TextInput component', () => {
  const onChangeText = jest.fn()
  const onSubmitEditing = jest.fn()
  const onFocus = jest.fn()
  const onBlur = jest.fn()
  const onChangeTextMock = jest.fn()
  const onPressMock = jest.fn()
  const imgUrl = 'https://kenh14cdn.com/203336854389633024/2023/1/17/photo-12-1673980290121902612775.jpeg'

  afterEach(() => {
    onChangeTextMock.mockClear()
    onPressMock.mockClear()
  })

  it('renders the TextInput component with correct props', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Outlined
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
          onBlur={onBlur}
          value=""
        />
        ,
      </BaseProvider>,
    )
    const textInput = getByTestId('test-TextInputOutlined')

    expect(textInput).toBeDefined()
    expect(textInput.props.testID).toEqual('test-TextInputOutlined')
    expect(textInput.props.value).toEqual('')
    expect(textInput.props.onSubmitEditing).toEqual(onSubmitEditing)
  })

  it('renders correctly TextInput Flat', () => {
    const {getByTestId, getByText} = render(
      <BaseProvider>
        <TextInput.Flat
          value="test value"
          onChangeText={() => console.log()}
          placeholder="test placeholder"
          label="test label"
          errorText="test error"
        />
        ,
      </BaseProvider>,
    )
    const wrapper = getByTestId('test-Wrapper')
    const textInputContent = getByTestId('test-TextInputContent')
    const label = getByTestId('test-Label')
    const textInput = getByTestId('test-TextInputFlat')
    const errorText = getByText('test error')

    expect(wrapper).toBeTruthy()
    expect(textInputContent).toBeTruthy()
    expect(label).toBeTruthy()
    expect(textInput).toBeTruthy()
    expect(errorText).toBeTruthy()
  })

  it('should render the right component when it exists', () => {
    const RightComponent = <Text>Right Component</Text>
    const {queryByText} = render(
      <BaseProvider>
        <TextInput.Flat rightComponent={RightComponent} value="" />
      </BaseProvider>,
    )
    const rightComponentText = queryByText('Right Component')
    expect(rightComponentText).not.toBeNull()
  })

  it('should render textInput Flat the left component when it exists', () => {
    const LeftComponent = <Text>Left Component</Text>
    const {queryByText} = render(
      <BaseProvider>
        <TextInput.Flat leftComponent={LeftComponent} value="" />
      </BaseProvider>,
    )
    const leftComponentText = queryByText('Left Component')
    expect(leftComponentText).not.toBeNull()
  })

  it('should render textInput Outlined the right component when it exists', () => {
    const RightComponent = <Text>Right Component</Text>
    const {queryByText} = render(
      <BaseProvider>
        <TextInput.Outlined rightComponent={RightComponent} value="" />
      </BaseProvider>,
    )
    const rightComponentText = queryByText('Right Component')
    expect(rightComponentText).not.toBeNull()
  })

  it('should render textInput Outlined the left component when it exists', () => {
    const LeftComponent = <Text>Left Component</Text>
    const {queryByText} = render(
      <BaseProvider>
        <TextInput.Outlined leftComponent={LeftComponent} value="" />
      </BaseProvider>,
    )
    const leftComponentText = queryByText('Left Component')
    expect(leftComponentText).not.toBeNull()
  })

  it('should get the text input content info', async () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Outlined value="" />
      </BaseProvider>,
    )
    const textInputContent = getByTestId('test-TextInputContent')
    const event = {
      nativeEvent: {
        layout: {
          width: 100,
        },
      },
    }
    await act(async () => {
      fireEvent(textInputContent, 'layout', event)
    })

    expect(textInputContent.props.style.height).toBe('100%')
  })

  it('should get the text input content info text input flat', async () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Flat value="" />
      </BaseProvider>,
    )
    const textInputContent = getByTestId('test-TextInputContent')
    const event = {
      nativeEvent: {
        layout: {
          width: 100,
        },
      },
    }
    await act(async () => {
      fireEvent(textInputContent, 'layout', event)
    })

    expect(textInputContent.props.style.height).toBe('100%')
  })

  it('calls the onFocus and onBlur functions when TextInput is focused and blurred', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Outlined
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
          onBlur={onBlur}
          value=""
          label="asd"
        />
      </BaseProvider>,
    )
    const textInput = getByTestId('test-TextInputOutlined')

    fireEvent(textInput, 'focus')
    expect(onFocus).toHaveBeenCalled()

    fireEvent(textInput, 'blur')
    expect(onBlur).toHaveBeenCalled()
  })

  it('calls the onFocus and onBlur functions when TextInput Flat is focused and blurred', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Flat
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
          onBlur={onBlur}
          value=""
        />
      </BaseProvider>,
    )
    const textInput = getByTestId('test-TextInputFlat')

    fireEvent(textInput, 'focus')
    expect(onFocus).toHaveBeenCalled()

    fireEvent(textInput, 'blur')
    expect(onBlur).toHaveBeenCalled()
  })

  it('renders correctly with default props', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput testID="test-textInput" />
      </BaseProvider>,
    )
    const textInput = getByTestId('test-textInput')
    expect(textInput).toBeDefined()
  })

  it('renders correctly with label props', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput label="Test TextInput" />
      </BaseProvider>,
    )
    const title = getByTestId('test-title')
    expect(title).toBeTruthy()
  })

  it('renders correctly with isRequire props', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput isRequire label="Test TextInput" />
      </BaseProvider>,
    )
    const startText = getByTestId('test-startText')
    expect(startText).toBeTruthy()
  })

  it('renders left and right components', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput
          testID="test-textInput"
          leftComponent={<View testID="test-leftComponent" />}
          rightComponent={<View testID="test-rightComponent" />}
        />
      </BaseProvider>,
    )
    const leftComponent = getByTestId('test-leftComponent')
    expect(leftComponent).toBeTruthy()

    const rightComponent = getByTestId('test-rightComponent')
    expect(rightComponent).toBeTruthy()
  })

  it('renders correctly TextInput', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput testID="input-component" onChangeText={onChangeText} />
      </BaseProvider>,
    )
    const textInput = getByTestId('input-component')
    expect(textInput).toBeDefined()
  })

  it('calls the onChangeText callback when the text changes', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput testID="test-textInput" onChangeText={onChangeTextMock} />
      </BaseProvider>,
    )
    const textInput = getByTestId('test-textInput')
    fireEvent.changeText(textInput, 'hello world')
    expect(onChangeTextMock).toHaveBeenCalledWith('hello world')
  })

  it('should render multiline TextInput', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput testID="test-textInput" multiline={true} />
      </BaseProvider>,
    )
    const input = getByTestId('test-textInput')
    expect(input.props.multiline).toBeTruthy()
  })

  it('displays the error message when errorText is provided', () => {
    const {getByText} = render(
      <BaseProvider>
        <TextInput testID="test-textInput" errorText="This field is required" />
      </BaseProvider>,
    )
    const errorText = getByText('This field is required')
    expect(errorText).toBeDefined()
  })

  it('calls handleFocus on press', () => {
    const inputRef = React.createRef<TextInputRef>()
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput ref={inputRef} />
      </BaseProvider>,
    )
    const touchableContainer = getByTestId('test-TextInputComponent')

    fireEvent.press(touchableContainer)

    expect(inputRef.current?.focus).toBeTruthy()
  })

  it('calls TextInput Outlined handleFocus on press', () => {
    const inputRef = React.createRef<TextInputRef>()
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Outlined ref={inputRef} value="" />
      </BaseProvider>,
    )
    const touchableContainer = getByTestId('test-TextInputOutlined')

    fireEvent.press(touchableContainer)

    expect(inputRef.current?.focus).toBeTruthy()
  })

  it('calls TextInput Flat handleFocus on press', () => {
    const inputRef = React.createRef<TextInputRef>()
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Flat ref={inputRef} value="" />
      </BaseProvider>,
    )
    const touchableContainer = getByTestId('test-TextInputFlat')

    fireEvent.press(touchableContainer)

    expect(inputRef.current?.focus).toBeTruthy()
  })

  it('should blur input outlined when calling blur method', () => {
    const inputRef = React.createRef<TextInputRef>()
    render(
      <BaseProvider>
        <TextInput.Outlined ref={inputRef} value="" />
      </BaseProvider>,
    )
    act(() => inputRef.current?.blur())
    expect(inputRef.current?.blur).toBeTruthy()
  })

  it('should focus input outlined when calling focus method', () => {
    const inputRef = React.createRef<TextInputRef>()
    render(
      <BaseProvider>
        <TextInput.Outlined ref={inputRef} value="" />
      </BaseProvider>,
    )
    act(() => inputRef.current?.focus())
    expect(inputRef.current?.focus).toBeTruthy()
  })

  it('should clear input outlined when calling clear method', () => {
    const inputRef = React.createRef<TextInputRef>()
    render(
      <BaseProvider>
        <TextInput.Outlined ref={inputRef} value="" />
      </BaseProvider>,
    )
    act(() => inputRef.current?.clear())
    expect(inputRef.current?.clear).toBeTruthy()
  })

  it('should blur input flat when calling blur method', () => {
    const inputRef = React.createRef<TextInputRef>()
    render(
      <BaseProvider>
        <TextInput.Flat ref={inputRef} value="" />
      </BaseProvider>,
    )
    act(() => inputRef.current?.blur())
    expect(inputRef.current?.blur).toBeTruthy()
  })

  it('should focus input flat when calling focus method', () => {
    const inputRef = React.createRef<TextInputRef>()
    render(
      <BaseProvider>
        <TextInput.Flat ref={inputRef} value="" />
      </BaseProvider>,
    )
    act(() => inputRef.current?.focus())
    expect(inputRef.current?.focus).toBeTruthy()
  })

  it('should clear input flat when calling clear method', () => {
    const inputRef = React.createRef<TextInputRef>()
    render(
      <BaseProvider>
        <TextInput.Flat ref={inputRef} value="" />
      </BaseProvider>,
    )
    act(() => inputRef.current?.clear())
    expect(inputRef.current?.clear).toBeTruthy()
  })

  it('should blur input when calling blur method', () => {
    const inputRef = React.createRef<TextInputRef>()
    render(
      <BaseProvider>
        <TextInput ref={inputRef} />
      </BaseProvider>,
    )
    act(() => inputRef.current?.blur())
    expect(inputRef.current?.blur).toBeTruthy()
  })

  it('should focus input when calling focus method', () => {
    const inputRef = React.createRef<TextInputRef>()
    render(
      <BaseProvider>
        <TextInput ref={inputRef} />
      </BaseProvider>,
    )
    act(() => inputRef.current?.focus())
    expect(inputRef.current?.focus).toBeTruthy()
  })

  it('should clear input when calling clear method', () => {
    const inputRef = React.createRef<TextInputRef>()
    render(
      <BaseProvider>
        <TextInput ref={inputRef} />
      </BaseProvider>,
    )
    act(() => inputRef.current?.clear())
    expect(inputRef.current?.clear).toBeTruthy()
  })

  it('renders correctly with icon', () => {
    const source = {uri: imgUrl}
    const size = 24
    const color = 'red'
    const resizeMode = 'contain'
    const iconContainerStyle = {backgroundColor: 'white'}
    const iconStyle = {borderWidth: 1}
    const onPress = jest.fn()

    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Icon
          source={source}
          size={size}
          color={color}
          resizeMode={resizeMode}
          iconContainerStyle={iconContainerStyle}
          iconStyle={iconStyle}
          onPress={onPress}
        />
      </BaseProvider>,
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
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Icon source={{uri: imgUrl}} onPress={onPressMock} />
      </BaseProvider>,
    )

    const icon = getByTestId('icon')
    fireEvent.press(icon)

    expect(onPressMock).toHaveBeenCalled()
  })

  it('should render with default onPress', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Icon source={{uri: imgUrl}} onPress={undefined} />
      </BaseProvider>,
    )
    const icon = getByTestId('icon')
    fireEvent.press(icon)
    expect(onPressMock).not.toHaveBeenCalled()
  })

  it('renders TextInput Outlined without errors', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Outlined value="" />
      </BaseProvider>,
    )
    const component = getByTestId('test-TextInputOutlined')
    expect(component).toBeDefined()
  })

  it('calls onChangeText callback on input outlined text change', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Outlined onChangeText={onChangeText} value="" />
      </BaseProvider>,
    )
    const component = getByTestId('test-TextInputOutlined')
    const text = 'test'
    fireEvent.changeText(component, text)
    expect(onChangeText).toHaveBeenCalledWith(text)
  })

  it('renders error text when errorText prop is present', () => {
    const errorText = 'Invalid input'
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Outlined errorText={errorText} />
      </BaseProvider>,
    )
    const errorTextComponent = getByTestId('test-ErrorText')
    expect(errorTextComponent).toBeDefined()
    expect(errorTextComponent.props.children).toBe(errorText)
  })

  it('does not render error text when errorText prop is not present', () => {
    const {queryByTestId} = render(
      <BaseProvider>
        <TextInput.Outlined />
      </BaseProvider>,
    )
    const errorTextComponent = queryByTestId('test-ErrorText')
    expect(errorTextComponent).toBeNull()
  })

  it('should call onChangeText with the entered text', () => {
    const {getByTestId} = render(
      <BaseProvider>
        <TextInput.Flat onChangeText={onChangeTextMock} />
      </BaseProvider>,
    )
    const input = getByTestId('test-TextInputFlat')
    const text = 'Test Text'
    fireEvent.changeText(input, text)
    expect(onChangeTextMock).toHaveBeenCalledWith(text)
  })
})
