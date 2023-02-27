import React, {useEffect, useRef, useState, forwardRef, memo} from 'react'
import {View, StyleSheet, Animated, Dimensions} from 'react-native'
import {metrics} from '../helpers/metrics'

interface IProgressProps {
  /**
   * Current percent of the Progress bar
   * default 0, max 100
   */
  value?: number
  /**
   * Defines height of Progress bar
   * default 16
   */
  size?: number
  /**
   * Defines borderRadius of Progress bar
   * default 0
   */
  borderRadius?: number
  /**
   * Defines color of Track Bar
   * default #49BE25
   */
  filledTrackColor?: string
  /**
   * Defines background color of Progress bar
   * default #E5E5E5
   */
  backgroundColor?: string
  /**
   * Defines full width of the progress bar
   */
  width?: number
}

const {width: screenWidth} = Dimensions.get('screen')
const MAX_VALUE = 100

const Progress = forwardRef<View, IProgressProps>(
  (
    {
      width,
      value = 0,
      size = metrics.small,
      borderRadius = 0,
      filledTrackColor = '#49BE25',
      backgroundColor = '#E5E5E5',
    },
    ref,
  ) => {
    const [progressWidth, setProgressWidth] = useState(0)
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
      const progressValue = value >= MAX_VALUE ? MAX_VALUE : value
      toTranslateX.setValue(-progressWidth + (progressWidth * progressValue) / MAX_VALUE)
    }, [progressWidth, value])

    return (
      <View
        ref={ref}
        style={StyleSheet.flatten([
          styles.progress,
          {width: width ? width : '100%', height: size, backgroundColor, borderRadius},
        ])}
        onLayout={({nativeEvent: {layout}}) => setProgressWidth(layout.width)}>
        <Animated.View
          style={{
            transform: [{translateX}],
            backgroundColor: filledTrackColor,
            borderRadius,
            height: size,
            width: progressWidth,
          }}
        />
      </View>
    )
  },
)

export default memo(Progress)

const styles = StyleSheet.create({
  progress: {
    overflow: 'hidden',
  },
})
