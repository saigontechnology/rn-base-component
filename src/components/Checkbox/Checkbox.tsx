import React, {useEffect, forwardRef, useImperativeHandle, useState, useCallback} from 'react'
import {
  Text,
  View,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Pressable,
  ImageSourcePropType,
  TouchableWithoutFeedbackProps,
  StyleSheet,
} from 'react-native'
import Animated, {useSharedValue, withSequence, withSpring, withTiming} from 'react-native-reanimated'
import styled from 'styled-components/native'
import type {ITheme} from 'src/theme'
import {theme} from '../../theme'
import {BOUNCE_EFFECT_IN, BOUNCE_EFFECT_OUT, DISABLE_OPACITY} from './constants'

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>
type CustomImageStyleProp = StyleProp<ImageStyle> | Array<StyleProp<ImageStyle>>
type BaseTouchableProps = Pick<
  TouchableWithoutFeedbackProps,
  Exclude<keyof TouchableWithoutFeedbackProps, 'onPress'>
>
type StyledImageStyle = {
  theme?: ITheme
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
}
type InnerIconContainerStyle = {
  theme?: ITheme
  size?: number
  borderColor: string
}

export interface ICheckboxProps extends BaseTouchableProps {
  /** size of the checkbox */
  size?: number
  /** the text of the checkbox */
  text?: string
  /** color when checkbox is checked, default #ffc484 */
  fillColor?: string
  /** define the status of checkbox */
  isChecked?: boolean
  /** color when checkbox is unchecked, default transparent */
  unfillColor?: string
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
      fillColor = theme.colors.primary,
      unfillColor = theme.colors.transparent,
      disableBuiltInState = false,
      isChecked,
      innerIconStyle,
      checkIconImageSource = require('../../assets/images/check.png'),
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
    const [checked, setChecked] = useState(false)
    const bounceValue = useSharedValue(1)

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

    const renderCheckIcon = () => {
      const checkStatus = disableBuiltInState ? isChecked : checked

      return (
        <IconContainer
          testID={'icon-container'}
          size={size}
          backgroundColor={checked ? fillColor : unfillColor}
          disabled={disabled}
          disableOpacity={disableOpacity}
          style={StyleSheet.flatten([{transform: [{scale: bounceValue}]}, iconStyle])}>
          <InnerIconContainer style={innerIconStyle} size={size} borderColor={fillColor}>
            {iconComponent ||
              (checkStatus && <StyledImage source={checkIconImageSource} style={iconImageStyle} />)}
          </InnerIconContainer>
        </IconContainer>
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

export default Checkbox

const Container = styled(Pressable)({
  alignItems: 'center',
  flexDirection: 'row',
})

const StyledImage = styled(Image)((props: StyledImageStyle) => ({
  width: props.theme?.sizes?.small,
  height: props.theme?.sizes?.small,
}))

const TextContainer = styled(View)((props: TextContainerStyle) => ({
  marginLeft: props.theme?.sizes?.small,
  opacity: props.disabled ? props.disableOpacity : 1,
}))

const IconContainer = styled(Animated.View)((props: IconContainerStyle) => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: props.size || props.theme?.sizes?.huge,
  height: props.size || props.theme?.sizes?.huge,
  borderRadius: (props.size || props.theme?.sizes?.huge) ?? 24 / 4,
  backgroundColor: props.backgroundColor,
  opacity: props.disabled ? props.disableOpacity : 1,
}))

const InnerIconContainer = styled(View)((props: InnerIconContainerStyle) => ({
  borderWidth: props.theme?.borderWidths?.tiny,
  alignItems: 'center',
  justifyContent: 'center',
  width: props.size || props.theme?.sizes?.huge,
  height: props.size || props.theme?.sizes?.huge,
  borderRadius: (props.size || props.theme?.sizes?.huge) ?? 24 / 4,
  borderColor: props?.borderColor,
}))
