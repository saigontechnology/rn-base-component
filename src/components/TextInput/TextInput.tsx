import React, {
  forwardRef,
  ForwardRefExoticComponent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import type {
  StyleProp,
  TextInputProps as RNTextInputProperties,
  TextProps,
  TextStyle,
  ViewStyle,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native'
import {TextInput as RNTextInput, StyleSheet, TouchableOpacity, View} from 'react-native'
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import styled from 'styled-components/native'
import TextInputOutlined from './TextInputOutlined'
import {CustomIcon, CustomIconProps, Error} from './components'
import {useTheme} from '../../hooks'
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

  /** If true, the text input will be focused when the user touches the input */
  focusOnTouch?: boolean

  /** If true, the label will animate from placeholder position to top-left when focused or has value */
  animatedLabel?: boolean

  /** Distance between the label and the input */
  animatedLabelDistance?: number

  /** Style for the animated label */
  animatedLabelStyle?: StyleProp<TextStyle>
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

const ANIMATION_DURATION = 150

export const TextInput = forwardRef<TextInputRef, TextInputProps>(
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
      focusOnTouch,
      animatedLabel,
      animatedLabelDistance,
      animatedLabelStyle,
      value,
      defaultValue,
      placeholder,
      ...rest
    },
    ref,
  ) => {
    const TextInputTheme = useTheme().components.TextInput
    const inputRef = useRef<RNTextInput>(null)

    // Track focus state and internal value for animated label
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(!!value || !!defaultValue)

    // Shared value for label position (0 = placeholder position, 1 = top position)
    const labelAnimatedValue = useSharedValue(!!value || !!defaultValue ? 1 : 0)

    // Update hasValue when controlled value changes
    useEffect(() => {
      if (value !== undefined) {
        setHasValue(!!value)
      }
    }, [value])

    // Animate label when focus or value changes
    useEffect(() => {
      if (animatedLabel && label) {
        const shouldAnimate = isFocused || hasValue
        labelAnimatedValue.value = withTiming(shouldAnimate ? 1 : 0, {
          duration: ANIMATION_DURATION,
        })
      }
    }, [isFocused, hasValue, animatedLabel, label, labelAnimatedValue])

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => inputRef.current?.clear(),
      blur: () => inputRef.current?.blur(),
    }))

    const handleFocus = useCallback(() => {
      inputRef.current?.focus()
    }, [])

    const handleInputFocus = useCallback(() => {
      setIsFocused(true)
      onFocus?.()
    }, [onFocus])

    const handleInputBlur = useCallback(() => {
      setIsFocused(false)
      onBlur?.()
    }, [onBlur])

    const handleChangeText = useCallback(
      (text: string) => {
        setHasValue(!!text)
        onChangeText?.(text)
      },
      [onChangeText],
    )

    const componentFocusOnTouch = focusOnTouch ?? TextInputTheme.focusOnTouch ?? false

    const ContainerComponent = componentFocusOnTouch
      ? (TouchableOpacity as React.JSXElementConstructor<TouchableOpacityProps>)
      : (View as React.JSXElementConstructor<ViewProps>)

    // Determine if we should show animated label
    const showAnimatedLabel = animatedLabel && !!label
    const animatedLabelDistanceValue = animatedLabelDistance ?? TextInputTheme.animatedLabelDistance ?? 12

    // Animated styles for label using reanimated
    const animatedLabelStyleTransform = useAnimatedStyle(() => {
      if (!showAnimatedLabel) {
        return {}
      }
      return {
        transform: [
          {
            translateY: interpolate(labelAnimatedValue.value, [0, 1], [0, -animatedLabelDistanceValue]),
          },
          {
            scale: interpolate(labelAnimatedValue.value, [0, 1], [1, 0.85]),
          },
        ],
      }
    }, [showAnimatedLabel, animatedLabelDistanceValue, labelAnimatedValue])

    //
    const textInputBasedStyle: StyleProp<ViewStyle> = animatedLabel
      ? {position: 'relative', top: animatedLabelDistanceValue}
      : {}

    // When animatedLabel is true, placeholder should be empty
    const effectivePlaceholder = showAnimatedLabel ? '' : placeholder

    return (
      <ContainerComponent
        style={[TextInputTheme.containerStyle, StyleSheet.flatten(containerStyle)]}
        onPress={componentFocusOnTouch ? handleFocus : undefined}
        activeOpacity={1}>
        {!!label && !showAnimatedLabel && (
          <Title
            testID="test-title"
            style={[TextInputTheme.labelStyle, StyleSheet.flatten(labelStyle)]}
            {...labelProps}>
            {label}
            {!!isRequire && <StarText testID="test-startText"> *</StarText>}
          </Title>
        )}
        <TouchableContainer
          style={[TextInputTheme.inputContainerStyle, StyleSheet.flatten(inputContainerStyle)]}
          activeOpacity={1}
          onPress={handleFocus}
          disabled={editable ?? TextInputTheme.editable}>
          {!!leftComponent && leftComponent}
          <InputWrapper>
            {showAnimatedLabel && (
              <AnimatedLabelContainer
                style={animatedLabelStyleTransform}
                pointerEvents="none"
                testID="test-animated-label">
                <AnimatedLabelText
                  style={[
                    TextInputTheme.labelStyle,
                    TextInputTheme.animatedLabelStyle,
                    StyleSheet.flatten(labelStyle),
                    StyleSheet.flatten(animatedLabelStyle),
                  ]}
                  {...labelProps}>
                  {label}
                  {!!isRequire && <StarText testID="test-startText"> *</StarText>}
                </AnimatedLabelText>
              </AnimatedLabelContainer>
            )}
            <TextInputComponent
              testID="test-TextInputComponent"
              ref={inputRef}
              style={[textInputBasedStyle, TextInputTheme.inputStyle, StyleSheet.flatten(inputStyle)]}
              editable={editable ?? TextInputTheme.editable}
              multiline={multiline ?? TextInputTheme.multiline}
              numberOfLines={numberOfLines ?? TextInputTheme.numberOfLines}
              onChangeText={handleChangeText}
              onFocus={handleInputFocus}
              onSubmitEditing={onSubmitEditing}
              onBlur={handleInputBlur}
              value={value}
              defaultValue={defaultValue}
              placeholder={effectivePlaceholder}
              {...rest}
            />
          </InputWrapper>
          {!!rightComponent && rightComponent}
        </TouchableContainer>
        {!!errorText && <Error errorProps={errorProps} errorText={errorText} />}
      </ContainerComponent>
    )
  },
) as CompoundedComponent

const TouchableContainer = styled.TouchableOpacity(({theme}) => ({
  flexDirection: 'row',
  borderColor: theme?.colors?.primaryBorder,
  height: theme?.sizes?.narrow,
  alignItems: 'center',
}))

const InputWrapper = styled.View({
  flex: 1,
  justifyContent: 'center',
})

const AnimatedLabelContainer = styled(Animated.View)({
  position: 'absolute',
  left: 0,
  right: 0,
  transformOrigin: 'left center',
  zIndex: 999,
})

const AnimatedLabelText = styled(Animated.Text)(({theme}) => ({
  fontSize: theme?.fontSizes?.sm,
  color: theme?.colors?.textColor,
}))

const Title = styled.Text(({theme}) => ({
  fontSize: theme?.fontSizes?.xs,
  color: theme?.colors?.textColor,
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
