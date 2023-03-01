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
  /** size of the checkbox */
  size?: number
  /** the text of the checkbox */
  text?: string
  /** color when checkbox is checked
   * default #ffc484
   */
  fillColor?: string
  /** define the status of checkbox */
  isChecked?: boolean
  /** color when checkbox is unchecked
   * default transparent
   */
  unfillColor?: string
  /** disable checkbox */
  disable?: boolean
  /** opacity of checkbox when disable
   * default 0.5
   */
  disableOpacity?: number
  /** disable the checkbox text */
  disableText?: boolean
  /** bounceEffect animation when press */
  bounceEffect?: number
  /** bounceFriction animation when press */
  bounceFriction?: number
  /** useNativeDriver or not
   * default true
   */
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
          testID={'icon-container'}
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
            <Text testID="text" style={textStyle}>
              {text}
            </Text>
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
        testID="container"
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
