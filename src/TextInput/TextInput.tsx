import React, {forwardRef, ForwardRefExoticComponent} from 'react'
import {
  Text,
  TextInput as Input,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextProps,
  ColorValue,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
  LayoutChangeEvent,
} from 'react-native'
import {metrics, responsiveFont} from '../helpers/metrics'
import {colors} from '../helpers/colors'
import TextInputFlat from './TextInputFlat'
import {Error, CustomIcon, CustomIconProps} from './components'
import styled from 'styled-components/native'

export interface TextInputProps {
  /** Style for container */
  containerStyle?: StyleProp<ViewStyle>

  /** If false, text is not editable. The default value is true. */
  editable?: boolean

  /** Styling for Input Component Container */
  inputContainerStyle?: StyleProp<ViewStyle>

  /** Style for Input Component */
  inputStyle?: StyleProp<TextStyle>

  /** Value of the text input */
  value?: string

  /** Add a label on top of the input */
  label?: string

  /** Add star beside the label */
  isRequire?: boolean

  /** Styling for the label. You can only use this if label is a string */
  labelStyle?: StyleProp<TextStyle>

  /** Props to be passed to the React Native Text component used to display the label or React Component used instead of simple string in label prop */
  labelProps?: TextProps

  /**
   * Sets the number of lines for a TextInput.
   * Use it with multiline set to true to be able to fill the lines.
   */
  numberOfLines?: number

  leftComponent?: React.ReactNode

  rightComponent?: React.ReactNode

  /**
   * Can tell TextInput to automatically capitalize certain characters.
   *    characters: all characters,
   *    words: first letter of each word
   *    sentences: first letter of each sentence
   *    none: don't auto capitalize anything
   */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'

  /** Vertically align text when `multiline` is set to true */
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center'

  /**
   * If false, disables auto-correct.
   * The default value is true.
   */
  autoCorrect?: boolean

  /**
   * If false, scrolling of the text view will be disabled. The default value is true. Only works with multiline={true}
   */
  scrollEnabled?: boolean

  /**
   * Limits the maximum number of characters that can be entered.
   * Use this instead of implementing the logic in JS to avoid flicker.
   */
  maxLength?: number

  /**
   * enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad',
   * 'decimal-pad', 'twitter', 'web-search', 'visible-password')
   */
  keyboardType?: KeyboardTypeOptions

  /** Display the error message at the bottom */
  errorText?: string

  /** Props to be passed to the error text component */
  errorProps?: TextProps

  /**
   * If true, focuses the input on componentDidMount.
   * The default value is false.
   */
  autoFocus?: boolean

  /** Whether the input can have multiple lines */
  multiline?: boolean

  /** The string that will be rendered before text input has been entered */
  placeholder?: string

  /** The text color of the placeholder string */
  placeholderTextColor?: ColorValue

  /**
   * enum('default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call')
   * Determines how the return key should look.
   */
  returnKeyType?: ReturnKeyTypeOptions

  /**
   * If true, the text input obscures the text entered so that sensitive text like passwords stay secure.
   * The default value is false.
   */
  secureTextEntry?: boolean

  /** Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler */
  onChangeText?: (text: string) => void

  /** Callback that is called when the text input is focused */
  onFocus?: () => void

  /** Callback that is called when the text input's submit button is pressed */
  onSubmitEditing?: () => void

  /** Callback that is called when the text input is blurred */
  onBlur?: () => void
}

export interface ITextInputFlat extends TextInputProps {
  /** Value of the text input */
  value: string
}

interface CompoundedComponent extends ForwardRefExoticComponent<TextInputProps> {
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

const TextInput = forwardRef<Input, TextInputProps>(
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
    },
    ref,
  ) => {
    return (
      <Container style={containerStyle}>
        {!!label && (
          <Title style={labelStyle} as={Text} {...labelProps}>
            {label}
            {!!isRequire && <StarText> *</StarText>}
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
