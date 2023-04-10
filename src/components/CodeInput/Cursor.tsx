import React, {useEffect} from 'react'
import type {StyleProp, TextStyle} from 'react-native'
import Animated, {useSharedValue, withRepeat, withSequence, withTiming} from 'react-native-reanimated'

interface ICursorProps {
  style?: StyleProp<TextStyle>
}

const Cursor = ({style}: ICursorProps) => {
  const animatedValue = useSharedValue(0)

  useEffect(() => {
    animatedValue.value = withRepeat(withSequence(withTiming(1), withTiming(0)), -1)
  }, [animatedValue])

  return <Animated.Text style={[{opacity: animatedValue}, style]}>|</Animated.Text>
}

export default Cursor
