import React, {forwardRef, ForwardRefExoticComponent, useCallback, useImperativeHandle, useRef} from 'react'
import type {
  TextInput as Input,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextProps,
  ColorValue,
  TextInputProps,
} from 'react-native'
import {isIOS, metrics, responsiveFont, responsiveHeight} from '../helpers/metrics'
import {colors} from '../helpers/colors'
import TextInputOutlined from './TextInputFloat'
import {Error, CustomIcon, CustomIconProps} from './components'
import styled from 'styled-components/native'

export type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse'
export type AnimationMode = 'Flat' | 'Outlined' | 'None'

export interface ITextInputProps extends TextInputProps {
  /** Style for container */
  containerStyle?: StyleProp<ViewStyle>

  /** If false, text is not editable. The default value is true. */
  editable?: boolean

  /** Styling for Input Component Container */
  inputContainerStyle?: StyleProp<ViewStyle>

  /** Style for Input Component */
  inputStyle?: StyleProp<TextStyle>

  /** Add a label on top of the input */
  label?: string

  /** Add star beside the label */
  isRequire?: boolean

  /** Styling for the label. You can only use this if label is a string */
  labelStyle?: StyleProp<TextStyle>

  /** Props to be passed to the React Native Text component used to display the label or React Component used instead of simple string in label prop */
  labelProps?: TextProps

  leftComponent?: React.ReactNode

  rightComponent?: React.ReactNode

  /** Display the error message at the bottom */
  errorText?: string

  /** Props to be passed to the error text component */
  errorProps?: TextProps

  /** Callback that is called when the text input is focused */
  onFocus?: () => void

  /** Callback that is called when the text input is blurred */
  onBlur?: () => void
}

export interface ITextInputAnimation extends ITextInputProps {
  /** Value of the text input */
  value: string
  mode?: AnimationMode
}

interface CompoundedComponent
  extends ForwardRefExoticComponent<ITextInputProps & React.RefAttributes<TextInputRef>> {
  Float: React.FunctionComponent<ITextInputAnimation>
  Icon: React.FunctionComponent<CustomIconProps>
}

export type TextInputRef = Pick<Input, 'focus' | 'blur' | 'clear'>

export interface InputContainerProps {
  multiline?: boolean
  isFocused?: boolean
}

export interface ITextInput {
  style?: StyleProp<TextStyle>
  underlineColorAndroid?: ColorValue
}

const TextInput = forwardRef<TextInputRef, ITextInputProps>(
  (
    {
      containerStyle,
      editable,
      inputContainerStyle,
      inputStyle,
      value,
      label,
      leftComponent,
      rightComponent,
      maxLength,
      errorText,
      errorProps,
      isRequire,
      numberOfLines,
      textAlignVertical,
      scrollEnabled,
      keyboardType,
      placeholderTextColor,
      returnKeyType,
      autoCapitalize,
      autoCorrect,
      labelStyle,
      labelProps,
      autoFocus,
      multiline,
      placeholder,
      secureTextEntry,
      onChangeText,
      onFocus,
      onSubmitEditing,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<Input>(null)

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => inputRef.current?.clear(),
      blur: () => inputRef.current?.blur(),
    }))

    const handleFocus = useCallback(() => {
      inputRef.current?.focus()
    }, [])

    return (
      <Container style={containerStyle}>
        {!!label && (
          <Title testID="test-title" style={labelStyle} {...labelProps}>
            {label}
            {!!isRequire && <StarText testID="test-startText"> *</StarText>}
          </Title>
        )}
        <TouchableContainer style={inputContainerStyle} activeOpacity={1} onPress={handleFocus}>
          {!!leftComponent && leftComponent}
          <TextInputComponent
            testID="test-TextInputComponent"
            ref={inputRef}
            value={value}
            style={inputStyle}
            editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholder={placeholder}
            maxLength={maxLength}
            textAlignVertical={textAlignVertical}
            scrollEnabled={scrollEnabled}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            autoFocus={autoFocus}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
            {...rest}
          />
          {!!rightComponent && rightComponent}
        </TouchableContainer>
        {!!errorText && <Error errorProps={errorProps} errorText={errorText} />}
      </Container>
    )
  },
) as CompoundedComponent

const Container = styled.View({
  flex: 1,
})

const TouchableContainer = styled.TouchableOpacity({
  flex: 1,
  flexDirection: 'row' as FlexDirection,
  alignItems: 'center',
  borderWidth: metrics.borderWidth,
  borderRadius: metrics.borderRadius,
  marginVertical: metrics.tiny,
  borderColor: colors.black,
  minHeight: metrics.huge,
  paddingHorizontal: metrics.tiny,
})

const Title = styled.Text({
  fontSize: responsiveFont(14),
  color: colors.grey,
})

const StarText = styled.Text({
  color: colors.red,
})

const TextInputComponent = styled.TextInput((props: InputContainerProps) => ({
  flex: 1,
  height: props.multiline ? metrics.giant : metrics.xxl,
  ...(!isIOS &&
    !props.multiline && {
      textAlignVertical: 'bottom',
      paddingBottom: metrics.tiny,
      lineHeight: responsiveHeight(5),
    }),
}))

TextInput.Float = TextInputOutlined

TextInput.Icon = CustomIcon

export default TextInput
