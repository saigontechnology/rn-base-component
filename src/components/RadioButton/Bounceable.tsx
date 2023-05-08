import * as React from 'react'
import {ViewStyle, StyleProp, Pressable, PressableProps, View} from 'react-native'
import Animated from 'react-native-reanimated'

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
   * The bounciness parameter determines how bouncy the animation should be when onPressIn
   * default: 0
   */
  bouncinessIn?: number
  /**
   * The bounciness parameter determines how bouncy the animation should be when onPressOut
   * default: 0
   */
  bouncinessOut?: number
  /**
   * useNativeDriver
   * default: true
   */
  useNativeDriver?: boolean
  /**
   * The children component of Bounceable
   */
  children?: React.ReactNode
  /**
   * Custom style for Bounceable
   */
  style?: CustomStyleProp
}

const Bounceable = React.forwardRef<PressableProps, IBounceableProps>(
  (
    {
      bounceEffectIn = 0.93,
      bounceEffectOut = 1,
      bounceVelocityIn = 0.1,
      bounceVelocityOut = 0.4,
      bouncinessIn = 0,
      bouncinessOut = 0,
      children,
      style,
      onPress,
      useNativeDriver = true,
      ...props
    },
    ref,
  ) => <View />,
)

Bounceable.displayName = 'Bounceable'

export default React.memo(Bounceable)
