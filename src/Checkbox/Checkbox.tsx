import React, {useEffect, useImperativeHandle, useRef, useState, memo} from 'react'
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
type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>
type CustomImageStyleProp = StyleProp<ImageStyle> | Array<StyleProp<ImageStyle>>
type BaseTouchableProps = Pick<
  TouchableWithoutFeedbackProps,
  Exclude<keyof TouchableWithoutFeedbackProps, 'onPress'>
>
export interface ICheckboxProps extends BaseTouchableProps {
  size?: number
  text?: string
  fillColor?: string
  isChecked?: boolean
  unfillColor?: string
  disable?: boolean
  disableOpacity?: number
  disableText?: boolean
  bounceEffect?: number
  bounceFriction?: number
  useNativeDriver?: boolean
  disableBuiltInState?: boolean
  bounceEffectIn?: number
  bounceEffectOut?: number
  bounceVelocityIn?: number
  bounceVelocityOut?: number
  bouncinessIn?: number
  bouncinessOut?: number
  iconComponent?: React.ReactNode
  textComponent?: React.ReactNode
  iconStyle?: CustomStyleProp
  innerIconStyle?: CustomStyleProp
  style?: CustomStyleProp
  textStyle?: CustomTextStyleProp
  iconImageStyle?: CustomImageStyleProp
  textContainerStyle?: CustomStyleProp
  checkIconImageSource?: ImageSourcePropType
  onPress?: (checked: boolean) => void
}

interface ICheckboxMethods {
  onHandlePress: () => void
}

const defaultCheckImage = require('../assets/images/check.png')

const Checkbox = React.forwardRef<ICheckboxMethods, ICheckboxProps>(
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
      onPress,
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

    const syntheticBounceEffect = () => {
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
    }

    const renderCheckIcon = () => {
      const checkStatus = disableBuiltInState ? isChecked! : checked

      return (
        <Animated.View
          style={StyleSheet.flatten([
            styles.iconContainer,
            {transform: [{scale: bounceValue}]},
            {
              width: size,
              height: size,
              borderRadius: size / 4,
              backgroundColor: checked ? fillColor : unfillColor,
            },
            iconStyle,
            {opacity: disable ? disableOpacity : 1},
          ])}>
          <View
            style={StyleSheet.flatten([
              styles.innerIconContainer,
              {width: size, height: size, borderRadius: size / 4, borderColor: fillColor},
              innerIconStyle,
            ])}>
            {iconComponent ||
              (checkStatus && (
                <Image
                  source={checkIconImageSource}
                  style={StyleSheet.flatten([styles.iconImageStyle, iconImageStyle])}
                />
              ))}
          </View>
        </Animated.View>
      )
    }

    const renderCheckboxText = () => {
      const checkDisableTextType = typeof disableText === 'undefined'
      return (
        (!disableText || checkDisableTextType) &&
        (textComponent || (
          <View
            style={StyleSheet.flatten([
              styles.textContainer,
              textContainerStyle,
              {opacity: disable ? disableOpacity : 1},
            ])}>
            <Text style={textStyle}>{text}</Text>
          </View>
        ))
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onHandlePress = () => {
      if (!disableBuiltInState) {
        setChecked(prev => !prev)
      }
      syntheticBounceEffect()
      onPress && onPress(!checked)
    }

    useImperativeHandle(forwardedRef, () => ({onHandlePress}), [onHandlePress])

    return (
      <Pressable
        {...rest}
        style={StyleSheet.flatten([styles.container, style])}
        onPressIn={!disable ? bounceInEffect : null}
        onPressOut={!disable ? bounceOutEffect : null}
        onPress={!disable ? onHandlePress : null}>
        {renderCheckIcon()}
        {renderCheckboxText()}
      </Pressable>
    )
  },
)

export default memo(Checkbox)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconImageStyle: {
    width: 10,
    height: 10,
  },
  textContainer: {
    marginLeft: 16,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerIconContainer: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
