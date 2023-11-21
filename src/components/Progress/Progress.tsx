import React, {useEffect, forwardRef, useCallback, useState, memo} from 'react'
import type {LayoutChangeEvent, View} from 'react-native'
import {View as RNView, ViewProps as RNViewProperties} from 'react-native'
import styled from 'styled-components/native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  interpolate,
} from 'react-native-reanimated'
import {metrics, deviceWidth} from '../../helpers/metrics'
import {theme} from '../../theme'

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
   */
  filledTrackColor?: string
  /**
   * Defines background color of Progress bar
   */
  backgroundColor?: string
  /**
   * Defines full width of the progress bar
   */
  width?: number
  /**
   * Defines progress mode
   */
  isIndeterminateProgress?: boolean
}

type ProgressStyle = {
  width: number | undefined
  size: number | undefined
  backgroundColor: string
  borderRadius: number
}

const screenWidth = deviceWidth()
const MAX_VALUE = 100

const Progress = forwardRef<View, IProgressProps>(
  (
    {
      width,
      value = 0,
      size = metrics.small,
      borderRadius = 0,
      filledTrackColor = theme.colors.primary,
      backgroundColor = theme.colors.gray,
      isIndeterminateProgress = false,
    },
    ref,
  ) => {
    const [progressWidth, setProgressWidth] = useState(0)
    const translateX = useSharedValue(-screenWidth)
    const animation = useSharedValue(0)

    useEffect(() => {
      const progressValue = value >= MAX_VALUE ? MAX_VALUE : value
      const newToTranslateX = -progressWidth + (progressWidth * progressValue) / MAX_VALUE
      if (isIndeterminateProgress) {
        animation.value = withRepeat(
          withTiming(1, {
            duration: 2000,
            easing: Easing.linear,
          }),
          -1,
        )
      } else {
        translateX.value = withTiming(newToTranslateX, {
          duration: 500,
          easing: Easing.linear,
        })
      }
    }, [animation, isIndeterminateProgress, progressWidth, translateX, value])

    const onLayout = useCallback((event: LayoutChangeEvent) => {
      const {layout} = event.nativeEvent
      setProgressWidth(layout.width)
    }, [])

    const progressStyle = useAnimatedStyle(() => {
      const translateXValue = isIndeterminateProgress
        ? interpolate(animation.value, [0, 1], [-progressWidth, 0.5 * progressWidth])
        : translateX.value

      const scaleXValue = isIndeterminateProgress
        ? interpolate(animation.value, [0, 0.5, 1], [0.0001, 1, 0.001])
        : 1

      return {
        transform: [{translateX: translateXValue}, {scaleX: scaleXValue}],
      }
    }, [progressWidth])

    return (
      <ProgressWrapper
        ref={ref}
        size={size}
        testID="progress-wrapper"
        onLayout={onLayout}
        {...{
          backgroundColor,
          borderRadius,
          width,
        }}>
        <Animated.View
          testID="filled-track"
          style={[
            progressStyle,
            {
              backgroundColor: filledTrackColor,
              borderRadius,
              height: size,
              width: progressWidth,
            },
          ]}
        />
      </ProgressWrapper>
    )
  },
)

Progress.displayName = 'Progress'

export default memo(Progress)

const ForwardRefProgressWrapperComponent = forwardRef<RNView, RNViewProperties>((props, ref) => (
  <RNView {...props} ref={ref} />
))

const ProgressWrapper = styled(ForwardRefProgressWrapperComponent)<ProgressStyle>(props => ({
  overflow: 'hidden',
  width: props.width,
  height: props.size,
  backgroundColor: props.backgroundColor,
  borderRadius: props.borderRadius,
}))
