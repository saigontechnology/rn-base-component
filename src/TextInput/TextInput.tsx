import React, {forwardRef} from 'react'
import {
  Text,
  TextInput as Input,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextProps,
  ColorValue,
  ReturnKeyTypeOptions,
  ImageSourcePropType,
  ImageResizeMode,
  ImageStyle,
  KeyboardTypeOptions,
} from 'react-native'
import {metrics} from '../helpers/metrics'
import {Icon} from '../Icon/Icon'
import styled from 'styled-components/native'
import {colors} from '../helpers/colors'

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

  /** Displays a left or right icon. (can be used along with iconPosition as well) */
  icon?: ImageSourcePropType

  /** Displays Icon size need to be used along with `icon` prop */
  iconSize?: number

  /** Displays Icon color need to be used along with `icon` prop */
  iconColor?: string

  /** Determines how to resize the image when the frame doesn't match the raw */
  resizeMode?: ImageResizeMode

  /**
   * Sets the number of lines for a TextInput.
   * Use it with multiline set to true to be able to fill the lines.
   */
  numberOfLines?: number

  /** Styling for Icon Component container */
  iconContainerStyle?: StyleProp<ViewStyle>

  /** Styling for Icon Component */
  iconStyle?: StyleProp<ImageStyle>

  /** Displays Icon to the position mentioned. Needs to be used along with `icon` prop */
  iconPosition?: 'left' | 'right'

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
  onBlur?: (args: any) => void
}

interface CustomIconProps {
  source: ImageSourcePropType
  size?: number
  color?: string
  resizeMode?: ImageResizeMode
  iconContainerStyle?: StyleProp<ViewStyle>
  iconStyle?: StyleProp<ImageStyle>
  style?: StyleProp<ViewStyle>
}

interface TextInputContainerProps {
  multiline?: boolean
}

const CustomIcon: React.FC<CustomIconProps> = ({
  source,
  size,
  color,
  resizeMode,
  iconContainerStyle,
  iconStyle,
}) => (
  <IconWrapper style={iconContainerStyle}>
    <Icon source={source} size={size} color={color} resizeMode={resizeMode} style={iconStyle} />
  </IconWrapper>
)

export const TextInput = forwardRef<Input, TextInputProps>(
  (
    {
      containerStyle,
      editable,
      inputContainerStyle,
      inputStyle,
      value,
      label,
      icon,
      iconSize,
      iconColor,
      iconContainerStyle,
      iconStyle,
      resizeMode,
      scrollEnabled,
      iconPosition = 'left',
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
    }: TextInputProps,
    ref,
  ) => {
    const renderedIcon = icon && (
      <CustomIcon
        source={icon}
        size={iconSize}
        color={iconColor}
        iconContainerStyle={iconContainerStyle}
        iconStyle={iconStyle}
        resizeMode={resizeMode}
      />
    )

    return (
      <Container style={containerStyle}>
        {!!label && (
          <Title style={labelStyle} as={Text} {...labelProps}>
            {label}
            {!!isRequire && <StarText> *</StarText>}
          </Title>
        )}
        <InputContainer multiline={multiline} style={inputContainerStyle}>
          {iconPosition === 'left' && renderedIcon}
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
          {iconPosition === 'right' && renderedIcon}
        </InputContainer>
        {!!errorText && (
          <ErrorText as={Text} {...errorProps}>
            {errorText}
          </ErrorText>
        )}
      </Container>
    )
  },
)

const Container = styled.View`
  align-items: flex-start;
`

const InputContainer = styled.View<TextInputContainerProps>`
  flex-direction: row;
  align-items: center;
  height: ${props => (props.multiline ? metrics.massive : metrics.xxxl)};
  min-height: 40;
  margin-top: ${metrics.tiny};
  margin-bottom: ${metrics.tiny};
  border-bottom-width: 1;
  border-bottom-color: ${colors.black};
`

const Title = styled.Text`
  font-size: 16;
  color: '#8B8B8B';
`

const StarText = styled.Text`
  color: ${colors.red};
`

const ErrorText = styled.Text`
  font-size: 14;
  color: ${colors.red};
`

interface ITextInput {
  style?: StyleProp<TextStyle>
  underlineColorAndroid?: ColorValue
}

const TextInputComponent = styled.TextInput<ITextInput>`
  flex: 1;
`

const IconWrapper = styled.View`
  margin-horizontal: ${metrics.xxs};
`
