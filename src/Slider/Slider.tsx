import React, {useCallback, useMemo, useRef, useState} from 'react'
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import {colors} from '../helpers/colors'
import {metrics, responsiveHeight} from '../helpers/metrics'
import styled from 'styled-components/native'

type SliderInfo = {
  range: number
  trackWidth: number
}

type TrackStyle = {
  hasTrackPoint?: boolean
  width?: number
}

type ThumbStyle = {
  hasCustomThumb?: boolean
}

type ThumbSize = {
  width: number
  height: number
}

type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse'
type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'

const INIT_FIRST_POSITION = 1
const NEXT_POINT = 1
const ONE_SLIDER_VALUE_UNIT = 1
const MINIMUM_TRACK_WIDTH = 0

export type SliderProps = {
  /** The maximum value of the slider */
  maximumValue: number

  /** The minimum value of the slider */
  minimumValue: number

  /** Style of the slider's track */
  trackStyle?: StyleProp<ViewStyle>

  /** Style of the slider's thumb */
  thumbStyle?: StyleProp<ViewStyle>

  /** custom element that can be used to replace the default thumb of the slider */
  customThumb?: React.ReactElement

  /** Whether to show the point on the slider's track */
  hasTrackPoint?: boolean

  /** Style of the point on the slider's track */
  trackPointStyle?: StyleProp<ViewStyle>

  /** Size of the slider's thumb */
  thumbSize?: ThumbSize

  /** Callback function to handle the change in slider value */
  onChangeValue?: (value: number) => void
}

type SliderPropsWithOptionalWidth = SliderProps & {
  width?: number
} & ({hasTrackPoint: true; width: number} | {hasTrackPoint?: false; width?: number})

const Slider: React.FunctionComponent<SliderPropsWithOptionalWidth> = ({
  minimumValue,
  maximumValue,
  trackStyle,
  thumbStyle,
  customThumb,
  hasTrackPoint,
  width,
  thumbSize = {width: metrics.medium, height: metrics.medium},
  trackPointStyle,
  onChangeValue,
}) => {
  const sliderAnimation = useRef<Animated.Value>(new Animated.Value(0)).current
  const lastGestureDx = useRef<number>(+sliderAnimation || 0)
  const [trackWidth, setTrackWidth] = useState<number>(0)
  const sliderInfo = useRef<SliderInfo>({range: 0, trackWidth: 0})

  // preValue to store the previous slider value
  const preValue = useRef<number>(minimumValue)

  const handleStartShouldSetPanResponder = useCallback(() => {
    sliderAnimation.setValue(lastGestureDx.current)
    return true
  }, [sliderAnimation])

  /**
   * This function updates the slider with the new value and position
   * @param {number} currentSliderValue - The current value of the slider
   * @param {number} currentPoint - The current point of the slider
   * @param {number} position - The current position of the thumb on the track
   */
  const updateSlider = useCallback(
    (currentSliderValue: number, currentPoint: number, position: number) => {
      onChangeValue?.(currentSliderValue)
      preValue.current = currentPoint
      sliderAnimation.setValue(position)
    },
    [onChangeValue, sliderAnimation],
  )

  const handlePanResponderMove = useCallback(
    (gestureState: PanResponderGestureState) => {
      const {range, trackWidth} = sliderInfo.current
      const newPosition = lastGestureDx.current + gestureState.dx
      // Calculate the new slider value based on the new position and the range
      const sliderValue = newPosition / range

      // When sliding the thumb over the track's width
      if (newPosition > trackWidth) {
        updateSlider(maximumValue, maximumValue - minimumValue, trackWidth)
      }
      // When sliding the thumb across a distance shorter than the track's width
      else if (newPosition < MINIMUM_TRACK_WIDTH) {
        updateSlider(minimumValue, MINIMUM_TRACK_WIDTH, MINIMUM_TRACK_WIDTH)
      }
      // When sliding steadily increases
      else if (sliderValue - preValue.current > ONE_SLIDER_VALUE_UNIT) {
        updateSlider(
          minimumValue + Math.floor(sliderValue),
          Math.floor(sliderValue),
          range * Math.floor(sliderValue),
        )
      }
      // When sliding steadily decreases
      else if (preValue.current - sliderValue > ONE_SLIDER_VALUE_UNIT) {
        updateSlider(
          minimumValue + Math.floor(sliderValue + 1),
          Math.floor(sliderValue + 1),
          range * Math.floor(sliderValue + 1),
        )
      }
    },
    [updateSlider],
  )

  const handlePanResponderEnd = useCallback((gestureState: PanResponderGestureState) => {
    const {range, trackWidth} = sliderInfo.current
    const lastGesture = lastGestureDx.current + gestureState.dx

    if (lastGesture < MINIMUM_TRACK_WIDTH) {
      lastGestureDx.current = MINIMUM_TRACK_WIDTH
    } else if (lastGesture > trackWidth) {
      lastGestureDx.current = trackWidth
    } else {
      lastGestureDx.current = range * preValue.current
    }
  }, [])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => handleStartShouldSetPanResponder(),
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_, gestureState) => handlePanResponderMove(gestureState),
      onPanResponderRelease: (_, gestureState) => handlePanResponderEnd(gestureState),
    }),
  )

  const getTrackWidth = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout
    // Range refers to the width of a point
    // It is used to calculate the correct position of the slider while sliding
    const range = width / (maximumValue - minimumValue)
    sliderInfo.current = {range: range, trackWidth: width}

    setTrackWidth(width)
  }

  const scaleX = useMemo(
    () =>
      sliderAnimation.interpolate({
        inputRange: [0, trackWidth],
        outputRange: [0, 1],
      }),
    [sliderAnimation, trackWidth],
  )

  const TrackPointComponent = useMemo(() => {
    const tmpTrackWidth = hasTrackPoint ? width : trackWidth
    const tmpRange = tmpTrackWidth / (maximumValue - minimumValue) - responsiveHeight(1)

    // Render the track points based on the range
    return (
      <TrackPoint testID="slider-track-point" hasTrackPoint={hasTrackPoint} width={width}>
        {/**
         * Loop through the range of the slider track and render a point for each value
         * The value is calculated by subtracting the minimum value from the maximum value and subtracting 1 for the initial position
         */}
        {Array(maximumValue - minimumValue - INIT_FIRST_POSITION)
          .fill(0)
          .map((_, i) => (
            <Point
              testID="slider-point"
              key={i}
              style={[trackPointStyle, {left: tmpRange * (i + NEXT_POINT)}]}
            />
          ))}
      </TrackPoint>
    )
  }, [trackWidth, thumbSize.width])

  return (
    <Container>
      <Track
        testID={'slider-track'}
        style={[trackStyle, {width: hasTrackPoint ? width : '100%'}]}
        onLayout={getTrackWidth}
      />
      <Tracked
        testID={'slider-tracked'}
        style={[
          trackStyle,
          {
            ...StyleSheet.absoluteFillObject,
            width: hasTrackPoint ? width : '100%',
            transform: [{translateX: -trackWidth / 2}, {scaleX}, {translateX: trackWidth / 2}],
          },
        ]}
      />
      {!!hasTrackPoint && TrackPointComponent}
      <Thumb
        testID={'slider-thumb'}
        hasCustomThumb={!!customThumb}
        style={[
          thumbStyle,
          {
            height: thumbSize.height,
            width: thumbSize.width,
            left: -thumbSize.width / 2,
            transform: [{translateX: sliderAnimation}],
          },
        ]}
        {...panResponder.current.panHandlers}>
        {customThumb}
      </Thumb>
    </Container>
  )
}

const Container = styled.View({
  justifyContent: 'center',
})

const Track = styled.View({
  height: responsiveHeight(5),
  borderRadius: responsiveHeight(5),
  backgroundColor: '#F1F1F1',
})

const TrackPoint = styled.View((props: TrackStyle) => ({
  width: props.hasTrackPoint ? props.width : '100%',
  flexDirection: 'row' as FlexDirection,
  height: '100%',
  position: 'absolute' as Position,
  overflow: 'hidden',
}))

const Point = styled.View({
  height: '100%',
  width: responsiveHeight(1),
  backgroundColor: colors.primary,
})

const Tracked = styled(Animated.View)({
  height: responsiveHeight(5),
  borderTopLeftRadius: responsiveHeight(5),
  borderBottomLeftRadius: responsiveHeight(5),
  backgroundColor: colors.primary,
})

const Thumb = styled(Animated.View)((props: ThumbStyle) => ({
  position: 'absolute' as Position,
  borderRadius: props.hasCustomThumb ? 0 : metrics.medium,
  backgroundColor: props.hasCustomThumb ? 'transparent' : colors.white,
  borderWidth: props.hasCustomThumb ? 0 : 1,
}))

export default Slider
