import React, {useEffect, forwardRef, useImperativeHandle, useRef, useState, memo, useCallback} from 'react'
import {
  Text,
  View,
  Image,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Pressable,
  ImageSourcePropType,
  TouchableWithoutFeedbackProps,
  StyleSheet,
} from 'react-native'
import styled from 'styled-components/native'
import {metrics} from '../../helpers/metrics'

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>
type CustomImageStyleProp = StyleProp<ImageStyle> | Array<StyleProp<ImageStyle>>
type BaseTouchableProps = Pick<
  TouchableWithoutFeedbackProps,
  Exclude<keyof TouchableWithoutFeedbackProps, 'onPress'>
>
type TextContainerStyle = {
  disable: boolean
  disableOpacity: number
}
type IconContainerStyle = {
  size: number
  backgroundColor: string
  disable: boolean
  disableOpacity: number
}
type InnerIconContainerStyle = {
  size: number
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
  /** disable checkbox */
  disable?: boolean
  /** opacity of checkbox when disable, default 0.5 */
  disableOpacity?: number
  /** disable the checkbox text */
  disableText?: boolean
  /** bounceEffect animation when press */
  bounceEffect?: number
  /** bounceFriction animation when press */
  bounceFriction?: number
  /** useNativeDriver or not, default true */
  useNativeDriver?: boolean
  /** disableBuiltInState of checkbox */
  disableBuiltInState?: boolean
  /** bounceEffectIn animation when press */
  bounceEffectIn?: number
  /** bounceEffectOut animation when press */
  bounceEffectOut?: number
  /** bounceVelocityIn animation when press */
  bounceVelocityIn?: number
  /** bounceVelocityOut animation when press */
  bounceVelocityOut?: number
  /** bouncinessIn animation when press */
  bouncinessIn?: number
  /** bouncinessOut animation when press */
  bouncinessOut?: number
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultCheckImage = require('../../assets/images/check.png')

const Checkbox = forwardRef<ICheckboxMethods, ICheckboxProps>(
  (
    {
      style,
      size = 25,
      iconStyle,
      iconComponent,
      iconImageStyle,
      fillColor = '#ffc484',
      unfillColor = 'transparent',
      disableBuiltInState = false,
      isChecked,
      innerIconStyle,
      checkIconImageSource = defaultCheckImage,
      text,
      textComponent,
      textStyle,
      textContainerStyle,
      disableText = false,
      disable = false,
      disableOpacity = 0.5,
      bounceEffectIn = 0.9,
      bounceEffectOut = 1,
      bounceVelocityIn = 0.1,
      bounceVelocityOut = 0.4,
      bouncinessIn = 20,
      bouncinessOut = 20,
      useNativeDriver = true,
      onChange,
      ...rest
    },
    forwardedRef,
  ) => {
    const [checked, setChecked] = useState(false)
    const bounceValue = useRef(new Animated.Value(1)).current

    useEffect(() => {
      setChecked(isChecked ?? false)
    }, [isChecked])

    const bounceInEffect = () => {
      Animated.spring(bounceValue, {
        toValue: bounceEffectIn,
        velocity: bounceVelocityIn,
        bounciness: bouncinessIn,
        useNativeDriver,
      }).start()
    }

    const bounceOutEffect = () => {
      Animated.spring(bounceValue, {
        toValue: bounceEffectOut,
        velocity: bounceVelocityOut,
        bounciness: bouncinessOut,
        useNativeDriver,
      }).start()
    }

    const syntheticBounceEffect = useCallback(() => {
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: bounceEffectIn,
          duration: 50,
          useNativeDriver,
        }),
        Animated.spring(bounceValue, {
          toValue: bounceEffectOut,
          velocity: bounceVelocityOut,
          bounciness: bouncinessOut,
          useNativeDriver,
        }),
      ]).start()
    }, [bounceValue, bounceEffectIn, bounceEffectOut, bounceVelocityOut, bouncinessOut, useNativeDriver])

    const renderCheckIcon = () => {
      const checkStatus = disableBuiltInState ? isChecked : checked

      return (
        <IconContainer
          testID={'icon-container'}
          size={size}
          backgroundColor={checked ? fillColor : unfillColor}
          disable={disable}
          disableOpacity={disableOpacity}
          style={StyleSheet.flatten([{transform: [{scale: bounceValue}]}, iconStyle])}>
          <InnerIconContainer style={innerIconStyle} size={size} borderColor={fillColor}>
            {iconComponent ||
              (checkStatus && <StyledImage source={checkIconImageSource} style={iconImageStyle} />)}
          </InnerIconContainer>
        </IconContainer>
      )
    }

    const renderCheckboxText = () => {
      const checkDisableTextType = typeof disableText === 'undefined'
      return (
        (!disableText || checkDisableTextType) &&
        (textComponent || (
          <TextContainer style={textContainerStyle} disable={disable} disableOpacity={disableOpacity}>
            <Text testID="text" style={textStyle}>
              {text}
            </Text>
          </TextContainer>
        ))
      )
    }

    const onHandlePress = useCallback(() => {
      if (!disableBuiltInState) {
        setChecked(prev => !prev)
      }
      syntheticBounceEffect()
      onChange && onChange(!checked)
    }, [disableBuiltInState, checked, onChange, syntheticBounceEffect])

    useImperativeHandle(forwardedRef, () => ({onHandlePress}), [onHandlePress])

    return (
      <Container
        testID="container"
        {...rest}
        style={style}
        onPressIn={!disable ? bounceInEffect : null}
        onPressOut={!disable ? bounceOutEffect : null}
        onPress={!disable ? onHandlePress : null}>
        {renderCheckIcon()}
        {renderCheckboxText()}
      </Container>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export default memo(Checkbox)

const Container = styled(Pressable)({
  alignItems: 'center',
  flexDirection: 'row',
})

const StyledImage = styled(Image)({
  width: metrics.xs,
  height: metrics.xs,
})

const TextContainer = styled(View)((props: TextContainerStyle) => ({
  marginLeft: metrics.small,
  opacity: props.disable ? props.disableOpacity : 1,
}))

const IconContainer = styled(Animated.View)((props: IconContainerStyle) => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: props.size,
  height: props.size,
  borderRadius: props.size / 4,
  backgroundColor: props.backgroundColor,
  opacity: props.disable ? props.disableOpacity : 1,
}))

const InnerIconContainer = styled(View)((props: InnerIconContainerStyle) => ({
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: props.size,
  height: props.size,
  borderRadius: props.size / 4,
  borderColor: props.borderColor,
}))
