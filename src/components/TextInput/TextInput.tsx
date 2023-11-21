import React, {forwardRef, ForwardRefExoticComponent, useCallback, useImperativeHandle, useRef} from 'react'
import type {
  StyleProp,
  TextInputProps as RNTextInputProperties,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import {TextInput as RNTextInput, View} from 'react-native'
import styled from 'styled-components/native'
import TextInputOutlined from './TextInputOutlined'
import {CustomIcon, CustomIconProps, Error} from './components'
import {isIOS} from '../../helpers'
import TextInputFlat from './TextInputFlat'

export interface TextInputProps extends RNTextInputProperties {
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

  /** React node to be rendered on the left side of the input component */
  leftComponent?: React.ReactNode

  /** React node to be rendered on the right side of the input component */
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

interface CompoundedComponent
  extends ForwardRefExoticComponent<TextInputProps & React.RefAttributes<TextInputRef>> {
  Outlined: ForwardRefExoticComponent<TextInputProps & React.RefAttributes<TextInputRef>>
  Flat: ForwardRefExoticComponent<TextInputProps & React.RefAttributes<TextInputRef>>
  Icon: React.FC<CustomIconProps>
}

export type TextInputRef = Pick<RNTextInput, 'focus' | 'blur' | 'clear'>

export interface InputContainerProps {
  multiline?: boolean
  isFocused?: boolean
}

export const TextInput = forwardRef<any, TextInputProps>(
  (
    {
      containerStyle,
      editable,
      inputContainerStyle,
      inputStyle,
      label,
      leftComponent,
      rightComponent,
      errorText,
      errorProps,
      isRequire,
      numberOfLines,
      labelStyle,
      labelProps,
      multiline,
      onChangeText,
      onFocus,
      onSubmitEditing,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<RNTextInput>(null)

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => inputRef.current?.clear(),
      blur: () => inputRef.current?.blur(),
    }))

    const handleFocus = useCallback(() => {
      inputRef.current?.focus()
    }, [])

    return (
      <View style={containerStyle}>
        {!!label && (
          <Title testID="test-title" style={labelStyle} {...labelProps}>
            {label}
            {!!isRequire && <StarText testID="test-startText"> *</StarText>}
          </Title>
        )}
        <TouchableContainer
          style={inputContainerStyle}
          activeOpacity={1}
          onPress={handleFocus}
          disabled={editable}>
          {!!leftComponent && leftComponent}
          <TextInputComponent
            testID="test-TextInputComponent"
            ref={inputRef}
            style={inputStyle}
            editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
            {...rest}
          />
          {!!rightComponent && rightComponent}
        </TouchableContainer>
        {!!errorText && <Error errorProps={errorProps} errorText={errorText} />}
      </View>
    )
  },
) as CompoundedComponent

const TouchableContainer = styled.TouchableOpacity(({theme}) => ({
  flexDirection: 'row',
  borderColor: theme?.colors?.primaryBorder,
  height: theme?.sizes?.narrow,
  borderBottomWidth: theme?.borderWidths?.tiny,
  alignItems: 'center',
}))

const Title = styled.Text(({theme}) => ({
  fontSize: theme?.fontSizes?.xs,
  color: theme?.colors?.textColor,
  paddingLeft: isIOS ? 0 : theme?.spacing?.tiny,
  paddingBottom: theme?.spacing?.tiny,
}))

const StarText = styled.Text(({theme}) => ({
  color: theme?.colors?.errorText,
}))

const ForwardRefTextInputComponent = forwardRef<RNTextInput, RNTextInputProperties>((props, ref) => (
  <RNTextInput {...props} ref={ref} />
))

const TextInputComponent = styled(ForwardRefTextInputComponent)(({theme}) => ({
  flex: 1,
  paddingVertical: 0,
  fontSize: theme?.fontSizes?.sm,
  color: theme?.colors?.darkTextColor,
}))

TextInput.Outlined = TextInputOutlined
TextInput.Flat = TextInputFlat
TextInput.Icon = CustomIcon
