import React, {useEffect} from 'react'
import type {StyleProp, TextStyle} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface ICursorProps {
  style?: StyleProp<TextStyle>
}

export const Cursor = ({style}: ICursorProps) => {
  const animatedValue = useSharedValue(0)

  useEffect(() => {
    animatedValue.value = withRepeat(withSequence(withTiming(1), withTiming(0)), -1)
  }, [animatedValue])

  const animatedStyle = useAnimatedStyle(() => ({opacity: animatedValue.value}), [])

  return <Animated.Text style={[animatedStyle, style]}>|</Animated.Text>
}
