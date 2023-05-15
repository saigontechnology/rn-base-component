import * as React from 'react'
import {ViewStyle, StyleProp, Pressable, PressableProps, View} from 'react-native'
import Animated, {withSpring, useSharedValue, useAnimatedStyle} from 'react-native-reanimated'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>

export interface IBounceableProps extends PressableProps {
  /**
   * onPress event
   */
  onPress?: () => void
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
   * The children component of Bounceable
   */
  children?: React.ReactNode
  /**
   * Custom style for Bounceable
   */
  style?: CustomStyleProp
}

const Bounceable = React.forwardRef<View, IBounceableProps>(
  (
    {
      bounceEffectIn = 0.93,
      bounceEffectOut = 1,
      bounceVelocityIn = 0.1,
      bounceVelocityOut = 0.4,
      bouncinessValue = 80,
      children,
      style,
      onPress,
      ...props
    },
    ref,
  ) => {
    const scale = useSharedValue(1)
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
        {...props}
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
