import React, {useEffect, useRef} from 'react'
import {Animated, StyleProp, TextStyle} from 'react-native'

interface ICursorProps {
  style?: StyleProp<TextStyle>
}

const Cursor = ({style}: ICursorProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [animatedValue])

  return <Animated.Text style={[{opacity: animatedValue}, style]}>|</Animated.Text>
}

export default Cursor
