import React, {useEffect, forwardRef, useImperativeHandle, useState, useCallback, memo} from 'react'
import {
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
  TouchableWithoutFeedbackProps,
  StyleSheet,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import styled from 'styled-components/native'
import type {ITheme} from '../../theme'
import {Images} from '../../theme'
import {
  BOUNCE_EFFECT_IN,
  BOUNCE_EFFECT_OUT,
  DISABLE_OPACITY,
  DEFAULT_OPACITY,
  DEFAULT_BOUNCE_EFFECT,
} from './constants'
import {useTheme} from '../../hooks'

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>
type CustomImageStyleProp = StyleProp<ImageStyle> | Array<StyleProp<ImageStyle>>
type BaseTouchableProps = Pick<
  TouchableWithoutFeedbackProps,
  Exclude<keyof TouchableWithoutFeedbackProps, 'onPress'>
>
type StyledImageStyle = {
  theme?: ITheme
  tintColor?: string
}
type TextContainerStyle = {
  theme?: ITheme
  disabled: boolean
  disableOpacity: number
}
type IconContainerStyle = {
  theme?: ITheme
  size?: number
  backgroundColor: string
  disabled: boolean
  disableOpacity: number
  borderRadius?: number
}
type InnerIconContainerStyle = {
  theme?: ITheme
  size?: number
  borderColor: string
  borderRadius?: number
  borderWidth?: number
}

export interface ICheckboxProps extends BaseTouchableProps {
  /** size of the checkbox */
  size?: number
  /** the text of the checkbox */
  text?: string
  /** border radius of the checkbox */
  borderRadius?: number
  /** border width the checkbox */
  borderWidth?: number
  /** color when checkbox is checked, default #ffc484 */
  fillColor?: string
  /** define the status of checkbox */
  isChecked?: boolean
  /** color when checkbox is unchecked, default transparent */
  unfillColor?: string
  /** color of the check mark, default is white */
  checkMarkColor?: string
  /** opacity of checkbox when disable, default 0.5 */
  disableOpacity?: number
  /** disable the checkbox text */
  disableText?: boolean
  /** disableBuiltInState of checkbox */
  disableBuiltInState?: boolean
  /** bounceEffectIn animation when press */
  bounceEffectIn?: number
  /** bounceEffectOut animation when press */
  bounceEffectOut?: number
  /** define custom icon component */
  iconComponent?: React.ReactNode
  /** define custom text component */
  textComponent?: React.ReactNode
  /** custom style for the icon */
  iconStyle?: CustomStyleProp
  /** custom style for the inner icon */
  innerIconStyle?: CustomStyleProp
  /** style of container view  */
  style?: CustomStyleProp
  /** style of checkbox text */
  textStyle?: CustomTextStyleProp
  /** style icon image */
  iconImageStyle?: CustomImageStyleProp
  /** checkbox text container style */
  textContainerStyle?: CustomStyleProp
  /** define image source show when checkbox is checked */
  checkIconImageSource?: ImageSourcePropType
  /** callback when checkbox is change state */
  onChange?: (checked: boolean) => void
}

interface ICheckboxMethods {
  onHandlePress: () => void
}

const Checkbox = forwardRef<ICheckboxMethods, ICheckboxProps>(
  (
    {
      style,
      size,
      iconStyle,
      iconComponent,
      iconImageStyle,
      fillColor,
      unfillColor,
      checkMarkColor,
      borderRadius,
      borderWidth,
      disableBuiltInState = false,
      isChecked,
      innerIconStyle,
      checkIconImageSource = Images.check,
      text,
      textComponent,
      textStyle,
      textContainerStyle,
      disableText = false,
      disabled = false,
      disableOpacity = DISABLE_OPACITY,
      bounceEffectIn = BOUNCE_EFFECT_IN,
      bounceEffectOut = BOUNCE_EFFECT_OUT,
      onChange,
      ...rest
    },
    forwardedRef,
  ) => {
    const CheckboxTheme = useTheme().components.Checkbox
    const [checked, setChecked] = useState(false)
    const bounceValue = useSharedValue(DEFAULT_BOUNCE_EFFECT)

    useEffect(() => {
      setChecked(isChecked ?? false)
    }, [isChecked])

    const bounceInEffect = () => {
      bounceValue.value = withSpring(bounceEffectIn)
    }

    const bounceOutEffect = () => {
      bounceValue.value = withSpring(bounceEffectOut)
    }

    const syntheticBounceEffect = useCallback(() => {
      bounceValue.value = withSequence(withTiming(bounceEffectIn), withSpring(bounceEffectOut))
    }, [bounceValue, bounceEffectIn, bounceEffectOut])

    const animatedIconContainerStyle = useAnimatedStyle(() => ({
      transform: [{scale: withSequence(withTiming(bounceEffectIn), withSpring(bounceEffectOut))}],
    }))

    const renderCheckIcon = () => {
      const checkStatus = disableBuiltInState ? isChecked : checked

      return (
        <IconContainerAnimated
          testID={'icon-container'}
          disabled={disabled}
          disableOpacity={disableOpacity}
          {...CheckboxTheme}
          backgroundColor={
            checked
              ? fillColor ?? (CheckboxTheme.fillColor as string)
              : unfillColor ?? (CheckboxTheme.unfillColor as string)
          }
          style={[animatedIconContainerStyle, StyleSheet.flatten(iconStyle)]}>
          <InnerIconContainer style={innerIconStyle} {...CheckboxTheme}>
            {iconComponent ||
              (checkStatus && (
                <StyledImage
                  source={checkIconImageSource}
                  style={iconImageStyle}
                  tintColor={checkMarkColor ?? CheckboxTheme.checkMarkColor}
                />
              ))}
          </InnerIconContainer>
        </IconContainerAnimated>
      )
    }

    const renderCheckboxText = () =>
      !disableText &&
      (textComponent || (
        <TextContainer style={textContainerStyle} disabled={disabled} disableOpacity={disableOpacity}>
          <Text testID="text" style={textStyle}>
            {text}
          </Text>
        </TextContainer>
      ))

    const onHandlePress = useCallback(() => {
      if (!disableBuiltInState) {
        setChecked(prev => !prev)
      }
      syntheticBounceEffect()
      onChange?.(!checked)
    }, [disableBuiltInState, checked, onChange, syntheticBounceEffect])

    useImperativeHandle(forwardedRef, () => ({onHandlePress}), [onHandlePress])

    return (
      <Container
        testID="container"
        style={style}
        disabled={disabled}
        onPressIn={bounceInEffect}
        onPressOut={bounceOutEffect}
        onPress={onHandlePress}
        {...rest}>
        {renderCheckIcon()}
        {renderCheckboxText()}
      </Container>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export default memo(Checkbox)

const Container = styled.Pressable({
  alignItems: 'center',
  flexDirection: 'row',
})

const StyledImage = styled.Image<StyledImageStyle>(props => ({
  width: props.theme?.sizes?.petite,
  height: props.theme?.sizes?.petite,
}))

const TextContainer = styled.View<TextContainerStyle>(props => ({
  marginLeft: props.theme?.sizes?.petite,
  opacity: props.disabled ? props.disableOpacity : DEFAULT_OPACITY,
}))

const IconContainer = styled.View<IconContainerStyle>(props => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: props.size,
  height: props.size,
  borderRadius: props.borderRadius || props.size,
  backgroundColor: props.backgroundColor,
  opacity: props.disabled ? props.disableOpacity : DEFAULT_OPACITY,
}))

const IconContainerAnimated = Animated.createAnimatedComponent<ICheckboxProps & {backgroundColor: string}>(
  IconContainer,
)

const InnerIconContainer = styled.View<InnerIconContainerStyle>(props => ({
  borderWidth: props.borderWidth,
  alignItems: 'center',
  justifyContent: 'center',
  width: props.size,
  height: props.size,
  borderRadius: props.borderRadius || props.size,
  borderColor: props?.borderColor,
}))
