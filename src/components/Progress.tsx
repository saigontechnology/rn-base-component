import React, {useEffect, useRef, useState, forwardRef, memo, useCallback} from 'react'
import {View, Animated, LayoutChangeEvent} from 'react-native'
import {metrics, deviceWidth} from '../helpers/metrics'
import styled from 'styled-components/native'

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
      filledTrackColor = '#49BE25',
      backgroundColor = '#E5E5E5',
      isIndeterminateProgress = false,
    },
    ref,
  ) => {
    const [progressWidth, setProgressWidth] = useState(0)
    const translateX = useRef(new Animated.Value(-screenWidth)).current
    const toTranslateX = useRef(new Animated.Value(-screenWidth)).current
    const {current: animation} = React.useRef(new Animated.Value(0))
    const intermediate = React.useRef<Animated.CompositeAnimation | null>(null)

    useEffect(() => {
      if (isIndeterminateProgress) {
        intermediate.current = Animated.timing(animation, {
          duration: 2000,
          toValue: 1,
          useNativeDriver: true,
          isInteraction: false,
        })
        animation.setValue(0)
        Animated.loop(intermediate.current).start()
      } else {
        Animated.timing(translateX, {
          toValue: toTranslateX,
          duration: 500,
          useNativeDriver: true,
        }).start()
      }
    }, [])

    useEffect(() => {
      const progressValue = value >= MAX_VALUE ? MAX_VALUE : value
      toTranslateX.setValue(-progressWidth + (progressWidth * progressValue) / MAX_VALUE)
    }, [progressWidth, value])

    const onLayout = useCallback((event: LayoutChangeEvent) => {
      const {layout} = event.nativeEvent
      setProgressWidth(layout.width)
    }, [])

    return (
      <ProgressWrapper
        ref={ref}
        size={size}
        onLayout={onLayout}
        {...{
          backgroundColor,
          borderRadius,
          width,
        }}>
        <Animated.View
          style={{
            transform: [
              {
                translateX: isIndeterminateProgress
                  ? animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-progressWidth, 0.5 * progressWidth],
                    })
                  : translateX,
              },
              {
                scaleX: isIndeterminateProgress
                  ? animation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.0001, 1, 0.001],
                    })
                  : 1,
              },
            ],
            backgroundColor: filledTrackColor,
            borderRadius,
            height: size,
            width: progressWidth,
          }}
        />
      </ProgressWrapper>
    )
  },
)

Progress.displayName = 'Progress'

export default memo(Progress)

const ProgressWrapper = styled(View)((props: ProgressStyle) => ({
  overflow: 'hidden',
  width: props.width,
  height: props.size,
  backgroundColor: props.backgroundColor,
  borderRadius: props.borderRadius,
}))
