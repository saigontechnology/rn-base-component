import React, {useEffect, useRef, useState, forwardRef, memo} from 'react'
import {View, StyleSheet, Animated, Dimensions} from 'react-native'

interface IProgressProps {
  /**
   * Current percent of the Progress
   * default 0, max 100
   */
  value: number
  /**
   * Defines height of Progress
   * default 16
   */
  size?: number
  /**
   * Defines borderRadius of Progress
   * default 0
   */
  borderRadius?: number
  /**
   * Defines color of Track Bar
   * default #49BE25
   */
  filledTrackColor?: string
  /**
   * Defines background color of Progress
   * default #E5E5E5
   */
  backgroundColor?: string
}

const {width: screenWidth} = Dimensions.get('screen')

const Progress = (props: IProgressProps, ref?: any) => {
  const {
    value = 0,
    size = 16,
    borderRadius = 0,
    filledTrackColor = '#49BE25',
    backgroundColor = '#E5E5E5',
  } = props
  const [width, setWidth] = useState(0)
  const translateX = useRef(new Animated.Value(-screenWidth)).current
  const toTranslateX = useRef(new Animated.Value(-screenWidth)).current

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: toTranslateX,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  useEffect(() => {
    const _value = value >= 100 ? 100 : value
    toTranslateX.setValue(-width + (width * _value) / 100)
  }, [width, value])

  return (
    <View
      ref={ref}
      style={StyleSheet.flatten([styles.progress, {backgroundColor, height: size, borderRadius}])}
      onLayout={({nativeEvent: {layout}}) => setWidth(layout.width)}>
      <Animated.View
        style={{
          transform: [{translateX}],
          backgroundColor: filledTrackColor,
          borderRadius,
          height: size,
          width,
        }}
      />
    </View>
  )
}

export default memo(forwardRef(Progress))

const styles = StyleSheet.create({
  progress: {
    width: '100%',
    overflow: 'hidden',
  },
})
