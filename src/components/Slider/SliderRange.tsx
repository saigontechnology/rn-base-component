import React, {useCallback, useMemo} from 'react'
import {StyleSheet, LayoutChangeEvent} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated'
import {metrics} from '../../helpers/metrics'
import {colors} from '../../helpers/colors'
import styled from 'styled-components/native'
import {Thumb, TrackPoint} from './components'
import {DEFAULT_STEP, FIRST_POINT, MINIMUM_TRACK_WIDTH, ThumbPosition} from './Constants'
import type {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import type {AnimatedGHContext, AnimatedLabelProps, SliderInfo, SliderProps, TrackStyle} from './Slider'

type Point = {
  left: number
  right: number
}

type SliderAnimated = {
  opacity: number
  zIndex: number
}

const SliderRange: React.FunctionComponent<SliderProps> = ({
  minimumValue = 1,
  maximumValue = 10,
  step = DEFAULT_STEP,
  trackStyle,
  bgColorTrack = '#F1F1F1',
  bgColorTracked = colors.primary,
  thumbStyle,
  bgColorLabelView = colors.primary,
  alwaysShowValue,
  labelStyle,
  thumbComponent,
  hasTrackPoint,
  sliderWidth = 0,
  thumbSize = {width: metrics.medium, height: metrics.medium},
  trackPointStyle,
  onValueChange = () => null,
}) => {
  const sliderInfo = useSharedValue<SliderInfo>({range: 0, trackWidth: 0})
  const currentPoint = useSharedValue<Point>({left: FIRST_POINT, right: FIRST_POINT})
  const leftProgress = useSharedValue<number>(0)
  const rightProgress = useSharedValue<number>(0)
  const leftAnimated = useSharedValue<SliderAnimated>({opacity: 0, zIndex: 0})
  const rightAnimated = useSharedValue<SliderAnimated>({opacity: 0, zIndex: 0})

  const totalPoint = useMemo(() => (maximumValue - minimumValue) / step, [maximumValue, minimumValue, step])

  /**
   * This function updates the slider with the new position (progressing) and new point
   * @param {number} progressing - The current position of the thumb on the track
   * @param {number} currentPoint - The current point of the slider
   */
  const updateSlider = useCallback(
    (progressing: number, point: number, position: string) => {
      const progress = position === 'left' ? leftProgress : rightProgress
      progress.value = progressing
      currentPoint.value = {...currentPoint.value, [position]: point}
    },
    [currentPoint, leftProgress, rightProgress],
  )

  const leftHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: (_, ctx) => {
      ctx.startX = leftProgress.value
    },
    onActive: (event, ctx) => {
      const {trackWidth, range} = sliderInfo.value
      const {left, right} = currentPoint.value
      const leftProgressing = ctx.startX + event.translationX
      // Calculate the new slider value based on the leftProgressing (new position) and the range
      const sliderValue = leftProgressing / range

      leftAnimated.value = {zIndex: 1, opacity: 1}
      rightAnimated.value = {zIndex: 0, opacity: 0}

      // When sliding the thumb across a distance shorter than the track's width
      if (leftProgressing < MINIMUM_TRACK_WIDTH) {
        runOnJS(updateSlider)(MINIMUM_TRACK_WIDTH, FIRST_POINT, ThumbPosition.left)
      }
      // When sliding the thumb over the track's width
      else if (leftProgressing >= trackWidth + rightProgress.value) {
        runOnJS(updateSlider)(trackWidth + rightProgress.value, totalPoint + right, ThumbPosition.left)
      }
      // When sliding steadily increases
      else if (leftProgressing > range * (left + 1) && leftProgressing <= trackWidth + rightProgress.value) {
        const currentProgress = range * Math.floor(sliderValue)
        const point = Math.floor(sliderValue)
        runOnJS(updateSlider)(currentProgress, point, ThumbPosition.left)
      }
      // When sliding steadily decreases
      else if (leftProgressing < range * (left - 1)) {
        const currentProgress = range * Math.floor(sliderValue + 1)
        const point = Math.floor(sliderValue + 1)

        runOnJS(updateSlider)(currentProgress, point, ThumbPosition.left)
      }
    },
    onEnd: () => {
      leftAnimated.value = {...leftAnimated.value, opacity: 0}
      runOnJS(onValueChange)({
        minimum: minimumValue + currentPoint.value.left * step,
        maximum: minimumValue + (totalPoint + currentPoint.value.right) * step,
      })
    },
  })

  const rightHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: (_, ctx) => {
      ctx.startX = rightProgress.value
    },
    onActive: (event, ctx) => {
      const {trackWidth, range} = sliderInfo.value
      const {left, right} = currentPoint.value
      const rightProgressing = ctx.startX + event.translationX
      // Calculate the new slider value based on the rightProgressing (new position) and the range
      const sliderValue = rightProgressing / range
      leftAnimated.value = {zIndex: 0, opacity: 0}
      rightAnimated.value = {zIndex: 1, opacity: 1}

      // When sliding the thumb across a distance shorter than the track's width
      if (trackWidth + rightProgressing < leftProgress.value) {
        runOnJS(updateSlider)(-trackWidth + leftProgress.value, -totalPoint + left, ThumbPosition.right)
      }
      // When sliding the thumb over the track's width
      else if (rightProgressing > 0) {
        runOnJS(updateSlider)(0, 0, ThumbPosition.right)
      }
      // When sliding steadily increases
      else if (rightProgressing < -range * (-right + 1)) {
        const currentProgress = range * Math.floor(-sliderValue)
        const point = Math.floor(-sliderValue)
        runOnJS(updateSlider)(-currentProgress, -point, ThumbPosition.right)
      }
      // When sliding steadily decreases
      else if (rightProgressing > -range * (-right - 1)) {
        const currentProgress = range * Math.floor(-sliderValue + 1)
        const point = Math.floor(-sliderValue + 1)
        runOnJS(updateSlider)(-currentProgress, -point, ThumbPosition.right)
      }
    },
    onEnd: () => {
      rightAnimated.value = {...rightAnimated.value, opacity: 0}
      runOnJS(onValueChange)({
        minimum: minimumValue + currentPoint.value.left * step,
        maximum: minimumValue + (totalPoint + currentPoint.value.right) * step,
      })
    },
  })

  const leftThumbRangeStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(leftProgress.value, {duration: 1})}],
    zIndex: leftAnimated.value.zIndex,
  }))

  const rightThumbRangeStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(rightProgress.value, {duration: 1})}],
    zIndex: rightAnimated.value.zIndex,
  }))

  /**
   * Update opacity when touching the thumb
   * This animation should run within 200ms when the thumb is touched or released
   */
  const leftOpacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(leftAnimated.value.opacity, {
      duration: 200,
    }),
  }))

  const rightOpacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(rightAnimated.value.opacity, {
      duration: 200,
    }),
  }))

  /**
   * Display the current slider value in real time as the user slides the thumb along the slider track
   */
  const leftAnimatedProps = useAnimatedProps(
    () =>
      ({
        text: `${minimumValue + currentPoint.value.left * step}`,
      } as AnimatedLabelProps),
  )

  const rightAnimatedProps = useAnimatedProps(
    () =>
      ({
        text: `${maximumValue + currentPoint.value.right * step}`,
      } as AnimatedLabelProps),
  )

  const getTrackWidth = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout
    // Range refers to the width of a point
    // It is used to calculate the correct position of the slider while sliding
    const range = width / totalPoint
    sliderInfo.value = {...sliderInfo.value, range: range, trackWidth: width}
  }

  /**
   * Update the tracked width based on the thumb sliding
   */
  const animatedTrackStyle = useAnimatedStyle(() => {
    const {range} = sliderInfo.value
    const {left, right} = currentPoint.value

    const width =
      leftProgress.value === 0 && rightProgress.value === 0
        ? '100%'
        : range * (totalPoint + right) - range * left

    const transform = [{translateX: withTiming(range * left, {duration: 1})}]

    return {transform, width}
  })

  return (
    <Container style={!!sliderWidth && {width: sliderWidth}}>
      <Track
        backgroundColor={bgColorTrack}
        style={[trackStyle, !!sliderWidth && {width: sliderWidth}]}
        onLayout={getTrackWidth}
      />
      {!!hasTrackPoint && (
        <TrackPoint sliderWidth={sliderWidth} totalPoint={totalPoint} trackPointStyle={trackPointStyle} />
      )}
      <Tracked
        backgroundColor={bgColorTracked}
        style={[trackStyle, !!sliderWidth && {width: sliderWidth}, animatedTrackStyle]}
      />
      <Thumb
        text={minimumValue?.toString()}
        bgColorLabelView={bgColorLabelView}
        labelStyle={labelStyle}
        alwaysShowValue={alwaysShowValue}
        thumbSize={thumbSize}
        thumbComponent={thumbComponent}
        animatedProps={leftAnimatedProps}
        thumbStyle={[thumbStyle, {left: -thumbSize.width / 2}]}
        animatedThumbStyle={leftThumbRangeStyle}
        opacityStyle={leftOpacityStyle}
        onGestureEvent={leftHandler}
      />
      <Thumb
        text={maximumValue?.toString()}
        bgColorLabelView={bgColorLabelView}
        labelStyle={labelStyle}
        alwaysShowValue={alwaysShowValue}
        thumbSize={thumbSize}
        thumbComponent={thumbComponent}
        animatedProps={rightAnimatedProps}
        thumbStyle={[thumbStyle, {right: -thumbSize.width / 2}]}
        animatedThumbStyle={rightThumbRangeStyle}
        opacityStyle={rightOpacityStyle}
        onGestureEvent={rightHandler}
      />
    </Container>
  )
}

const Container = styled.View({
  justifyContent: 'center',
})

const Track = styled(Animated.View)((props: TrackStyle) => ({
  height: 10,
  borderRadius: 10,
  backgroundColor: props.backgroundColor,
}))

const Tracked = styled(Animated.View)((props: TrackStyle) => ({
  ...StyleSheet.absoluteFillObject,
  height: 10,
  borderRadius: 10,
  backgroundColor: props.backgroundColor,
}))

export default SliderRange
