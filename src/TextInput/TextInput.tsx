import React, {forwardRef, ForwardRefExoticComponent} from 'react'
import {
  Text,
  TextInput as Input,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextProps,
  ColorValue,
  LayoutChangeEvent,
  TextInputProps,
} from 'react-native'
import {metrics, responsiveFont} from '../helpers/metrics'
import {colors} from '../helpers/colors'
import TextInputFlat from './TextInputFlat'
import {Error, CustomIcon, CustomIconProps} from './components'
import styled from 'styled-components/native'

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

export interface ITextInputFlat extends ITextInputProps {
  /** Value of the text input */
  value: string
}

interface CompoundedComponent extends ForwardRefExoticComponent<ITextInputProps> {
  Flat: React.FunctionComponent<ITextInputFlat>
  Icon: React.FunctionComponent<CustomIconProps>
}

export interface TextInputContainerProps {
  multiline?: boolean
  isFocused?: boolean
  onLayout?: (event: LayoutChangeEvent) => void
}

export interface ITextInput {
  style?: StyleProp<TextStyle>
  underlineColorAndroid?: ColorValue
}

const TextInput = forwardRef<Input, ITextInputProps>(
  (
    {
      containerStyle,
      editable,
      inputContainerStyle,
      inputStyle,
      value,
      label,
      scrollEnabled,
      leftComponent,
      rightComponent,
      textAlignVertical = 'top',
      maxLength,
      numberOfLines,
      keyboardType,
      errorText,
      errorProps,
      isRequire,
      labelStyle,
      labelProps,
      autoCapitalize = 'none',
      autoCorrect,
      autoFocus,
      multiline,
      placeholder,
      placeholderTextColor,
      returnKeyType,
      secureTextEntry,
      onChangeText,
      onFocus,
      onSubmitEditing,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    return (
      <Container style={containerStyle}>
        {!!label && (
          <Title testID="test-title" style={labelStyle} as={Text} {...labelProps}>
            {label}
            {!!isRequire && <StarText testID="test-startText"> *</StarText>}
          </Title>
        )}
        <InputContainer multiline={multiline} style={inputContainerStyle}>
          {!!leftComponent && leftComponent}
          <TextInputComponent
            ref={ref}
            as={Input}
            value={value}
            style={inputStyle}
            editable={editable}
            underlineColorAndroid="transparent"
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
        </InputContainer>
        {!!errorText && <Error errorProps={errorProps} errorText={errorText} />}
      </Container>
    )
  },
) as CompoundedComponent

const Container = styled.View({
  flex: 1,
})

const InputContainer = styled.View<TextInputContainerProps>(props => ({
  flexDirection: 'row',
  alignItems: 'center',
  height: props.multiline ? metrics.massive : metrics.huge,
  borderWidth: 1,
  borderRadius: 6,
  marginVertical: metrics.tiny,
  borderColor: colors.black,
  minHeight: metrics.huge,
  paddingLeft: metrics.xxs,
}))

const Title = styled.Text({
  fontSize: responsiveFont(16),
  color: '#8B8B8B',
})

const StarText = styled.Text({
  color: colors.red,
})

const TextInputComponent = styled.TextInput({
  flex: 1,
})

TextInput.Flat = TextInputFlat

TextInput.Icon = CustomIcon

export default TextInput
