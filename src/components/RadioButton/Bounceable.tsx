import React from 'react'
import {ViewStyle, StyleProp, Pressable, PressableProps, View} from 'react-native'
import Animated, {withSpring, useSharedValue, useAnimatedStyle} from 'react-native-reanimated'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>

export interface IBounceableProps extends PressableProps {
  /**
   * The target value when onPressIn
   * default: 0.93
   */
  bounceEffectIn?: number
  /**
   * The target value when onPressOut
   * default: 1
   */
  bounceEffectOut?: number
  /**
   * The initial velocity of the animation in units per second when onPressIn
   * default: 0.1
   */
  bounceVelocityIn?: number
  /**
   * The initial velocity of the animation in units per second when onPressOut
   * default: 0.4
   */
  bounceVelocityOut?: number
  /**
   * The bounciness parameter determines how bouncy the animation should be when onPress
   * default: 0
   */
  bouncinessValue?: number
  /**
   * Custom style for Bounceable
   */
  style?: CustomStyleProp
}

const BOUNCE_EFFECT_IN_DEFAULT = 0.93
const BOUNCE_EFFECT_OUT_DEFAULT = 1
const BOUNCE_VELOCITY_IN_DEFAULT = 0.1
const BOUNCE_VELOCITY_OUT_DEFAULT = 0.4
const BOUNCINESS_VALUE_DEFAULT = 80
const SCALE_DEFAULT = 1

const Bounceable = React.forwardRef<View, IBounceableProps>(
  (
    {
      bounceEffectIn = BOUNCE_EFFECT_IN_DEFAULT,
      bounceEffectOut = BOUNCE_EFFECT_OUT_DEFAULT,
      bounceVelocityIn = BOUNCE_VELOCITY_IN_DEFAULT,
      bounceVelocityOut = BOUNCE_VELOCITY_OUT_DEFAULT,
      bouncinessValue = BOUNCINESS_VALUE_DEFAULT,
      children,
      style,
      onPress,
      ...rest
    },
    ref,
  ) => {
    const scale = useSharedValue(SCALE_DEFAULT)
    const velocity = useSharedValue(bounceVelocityIn)
    const bounciness = useSharedValue(bouncinessValue)

    const animatedStyle = useAnimatedStyle(
      () => ({
        transform: [
          {
            scale: withSpring(scale.value, {
              stiffness: bounciness.value,
              velocity: velocity.value,
            }),
          },
        ],
      }),
      [scale.value, bounciness.value, velocity.value],
    )

    const handlePressIn = () => {
      scale.value = bounceEffectIn
      velocity.value = bounceVelocityIn
    }

    const handlePressOut = () => {
      scale.value = bounceEffectOut
      velocity.value = bounceVelocityOut
    }

    return (
      <AnimatedPressable
        {...rest}
        ref={ref}
        style={[animatedStyle, style]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}>
        {children}
      </AnimatedPressable>
    )
  },
)

Bounceable.displayName = 'Bounceable'

export default React.memo(Bounceable)
