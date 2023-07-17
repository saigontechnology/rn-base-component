import React, {useCallback, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import styled from 'styled-components/native'
import {Thumb, Track, TrackPoint} from './components'
import {GestureHandlerRootView, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import type {AnimatedGHContext, AnimatedLabelProps, SliderCommonProps} from './Slider'
import type {ITheme} from '../../theme'
import {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated'
import {
  DEFAULT_MAXIMUM_VALUE,
  DEFAULT_MINIMUM_VALUE,
  DEFAULT_STEP,
  DURATION,
  FIRST_POINT,
  INIT_POINT,
  INIT_VALUE,
  INVISIBLE,
  MINIMUM_TRACK_WIDTH,
  NEXT_STEP,
  PREVIOUS_STEP,
  ThumbPosition,
  VISIBLE,
} from './constants'
import {useTheme} from '../../hooks'
import {hitSlop} from '../../helpers/metrics'
import type {Value, SliderAnimated, ContainerProps, NumberRange} from './SliderRange'

export interface SliderFixedRangeProps extends SliderCommonProps {
  /** The width of the slider */
  sliderWidth: number

  /** The custom React element to be used for the left thumb of the slider */
  leftThumbComponent?: React.ReactElement

  /** The custom React element to be used for the right thumb of the slider */
  rightThumbComponent?: React.ReactElement

  /**
   * The callback function that is called when the value of the slider changes
   * The value is an object with a minimum and a maximum property
   */
  onValueChange?: (value: NumberRange) => void
}

const SliderFixedRange: React.FC<SliderFixedRangeProps> = ({
  minimumValue = DEFAULT_MINIMUM_VALUE,
  maximumValue = DEFAULT_MAXIMUM_VALUE,
  step = DEFAULT_STEP,
  style,
  trackStyle,
  trackedStyle,
  thumbStyle,
  bgColorLabelView,
  alwaysShowValue,
  labelStyle,
  hitSlopPoint = hitSlop,
  leftThumbComponent,
  rightThumbComponent,
  tapToSeek,
  showTrackPoint,
  sliderWidth,
  thumbSize,
  trackPointStyle,
  onValueChange = () => null,
}) => {
  const totalPoint = useMemo(() => (maximumValue - minimumValue) / step, [maximumValue, minimumValue, step])
  const range = useMemo(() => sliderWidth / totalPoint, [sliderWidth, totalPoint])
  const theme = useTheme()
  const actualThumbSize = thumbSize || {width: theme.sizes.large, height: theme.sizes.large}

  const sliderValue = useSharedValue<Value>({left: INIT_POINT, right: maximumValue})
  const leftProgress = useSharedValue<number>(INIT_VALUE)
  const rightProgress = useSharedValue<number>(sliderWidth)
  const leftAnimated = useSharedValue<SliderAnimated>({opacity: INIT_VALUE, zIndex: INIT_VALUE})
  const rightAnimated = useSharedValue<SliderAnimated>({opacity: INIT_VALUE, zIndex: INIT_VALUE})

  /**
   * This function updates the slider with the new position (progressing) and new point
   * @param {number} progressing - The current position of the thumb on the track
   * @param {number} value - The value of the slider
   * @param {string} position - The position indicates the left thumb or the right thumb
   */
  const updateSlider = useCallback(
    (progressing: number, value: number, position: string) => {
      const progress = position === 'left' ? leftProgress : rightProgress
      progress.value = progressing
      sliderValue.value = {...sliderValue.value, [position]: value}
    },
    [sliderValue, leftProgress, rightProgress],
  )

  const leftHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: (_, ctx) => {
      ctx.startX = leftProgress.value
    },
    onActive: (event, ctx) => {
      const {left, right} = sliderValue.value
      const leftProgressing = ctx.startX + event.translationX
      // Calculate the ratio of the current left thumb position with respect to the entire range of the slider
      const leftProgressRatio = leftProgressing / range

      leftAnimated.value = {zIndex: VISIBLE, opacity: VISIBLE}
      rightAnimated.value = {zIndex: INVISIBLE, opacity: INVISIBLE}

      // When sliding the thumb across a distance shorter than the track's width
      if (leftProgressing < MINIMUM_TRACK_WIDTH) {
        runOnJS(updateSlider)(MINIMUM_TRACK_WIDTH, INIT_POINT, ThumbPosition.left)
      }
      // When sliding the thumb over the track's width
      else if (leftProgressing > rightProgress.value) {
        runOnJS(updateSlider)(rightProgress.value, right, ThumbPosition.left)
      }
      // When sliding steadily increases
      else if (leftProgressing > range * (left + NEXT_STEP)) {
        const currentProgress = range * Math.floor(leftProgressRatio)
        const point = Math.floor(leftProgressRatio)
        runOnJS(updateSlider)(currentProgress, point, ThumbPosition.left)
      }
      // When sliding steadily decreases
      else if (leftProgressing < range * (left - PREVIOUS_STEP)) {
        const currentProgress = range * Math.ceil(leftProgressRatio)
        const point = Math.ceil(leftProgressRatio)

        runOnJS(updateSlider)(currentProgress, point, ThumbPosition.left)
      }
    },
    onEnd: () => {
      // This line sets the opacity of the left label animated
      leftAnimated.value = {...leftAnimated.value, opacity: INVISIBLE}
      runOnJS(onValueChange)({
        minimum: minimumValue + sliderValue.value.left * step,
        maximum: minimumValue + sliderValue.value.right * step,
      })
    },
  })

  const rightHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: (_, ctx) => {
      ctx.startX = rightProgress.value
    },
    onActive: (event, ctx) => {
      const {left, right} = sliderValue.value
      const rightProgressing = ctx.startX + event.translationX
      // Calculate the ratio of the current right thumb position with respect to the entire range of the slider
      const rightProgressRatio = rightProgressing / range
      leftAnimated.value = {zIndex: INVISIBLE, opacity: INVISIBLE}
      rightAnimated.value = {zIndex: VISIBLE, opacity: VISIBLE}

      // When sliding the thumb across a distance shorter than the track's width
      if (rightProgressing < leftProgress.value) {
        runOnJS(updateSlider)(leftProgress.value, left, ThumbPosition.right)
      }
      // When sliding the thumb over the track's width
      else if (rightProgressing > sliderWidth) {
        runOnJS(updateSlider)(sliderWidth, totalPoint, ThumbPosition.right)
      }
      // When sliding steadily increases
      else if (rightProgressing > range * (right + NEXT_STEP)) {
        const currentProgress = range * Math.floor(rightProgressRatio)
        const point = Math.floor(rightProgressRatio)
        runOnJS(updateSlider)(currentProgress, point, ThumbPosition.right)
      }
      // When sliding steadily decreases
      else if (rightProgressing < range * (right - PREVIOUS_STEP)) {
        const currentProgress = range * Math.ceil(rightProgressRatio)
        const point = Math.ceil(rightProgressRatio)
        runOnJS(updateSlider)(currentProgress, point, ThumbPosition.right)
      }
    },
    onEnd: () => {
      // This line sets the opacity of the right label animated
      rightAnimated.value = {...rightAnimated.value, opacity: INVISIBLE}
      runOnJS(onValueChange)({
        minimum: minimumValue + sliderValue.value.left * step,
        maximum: minimumValue + sliderValue.value.right * step,
      })
    },
  })

  const leftThumbRangeStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(leftProgress.value, {duration: 1})}],
    zIndex: leftAnimated.value.zIndex,
  }))

  const rightThumbRangeStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(rightProgress.value - actualThumbSize.width / 2, {duration: 1})}],
    zIndex: rightAnimated.value.zIndex,
  }))

  /**
   * Update opacity when touching the thumb
   * This animation should run within 200ms when the thumb is touched or released
   */
  const leftOpacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(leftAnimated.value.opacity, {
      duration: DURATION,
    }),
  }))

  const rightOpacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(rightAnimated.value.opacity, {
      duration: DURATION,
    }),
  }))

  /**
   * Display the current slider value in real time as the user slides the thumb along the slider track
   */
  const leftAnimatedProps = useAnimatedProps(
    () =>
      ({
        text: `${minimumValue + sliderValue.value.left * step}`,
      } as AnimatedLabelProps),
  )

  const rightAnimatedProps = useAnimatedProps(
    () =>
      ({
        text: `${minimumValue + sliderValue.value.right * step}`,
      } as AnimatedLabelProps),
  )

  /**
   * Update the tracked width based on the thumb sliding
   */
  const animatedTrackStyle = useAnimatedStyle(() => {
    const width = rightProgress.value - leftProgress.value
    const transform = [{translateX: withTiming(leftProgress.value, {duration: 1})}]

    return {transform, width}
  })

  /**
   * Function called when the user presses on a point on the slider's track
   * Calculates the position of the pressed point on the slider's track and updates the slider's state accordingly
   * @param {number} point - The index of the point on the slider's track that was pressed by the user
   */
  const onPressPoint = useCallback(
    (point: number) => {
      const {left, right} = sliderValue.value
      const curPoint = point + FIRST_POINT
      const isPointToLeft = point <= sliderValue.value.left
      const getSliderValue = (value: number) => minimumValue + value * step
      const value = {
        minimum: isPointToLeft ? getSliderValue(curPoint) : getSliderValue(left),
        maximum: isPointToLeft ? getSliderValue(right) : getSliderValue(curPoint),
      }

      updateSlider(range * curPoint, curPoint, isPointToLeft ? ThumbPosition.left : ThumbPosition.right)
      onValueChange(value)
    },
    [sliderValue, minimumValue, step, updateSlider, range, onValueChange],
  )

  return (
    <GestureHandlerRootView>
      <Container width={sliderWidth} style={style}>
        <Track style={trackStyle} />
        {!!showTrackPoint && (
          <TrackPoint
            sliderWidth={sliderWidth}
            totalPoint={totalPoint}
            hitSlopPoint={hitSlopPoint}
            trackPointStyle={trackPointStyle}
            activeOpacity={tapToSeek ? 0 : 1}
            onPressPoint={(point: number) => tapToSeek && onPressPoint(point)}
          />
        )}
        <Tracked style={[trackedStyle, animatedTrackStyle]} />
        <Thumb
          text={minimumValue?.toString()}
          bgColorLabelView={bgColorLabelView}
          labelStyle={labelStyle}
          alwaysShowValue={alwaysShowValue}
          thumbSize={actualThumbSize}
          thumbComponent={leftThumbComponent}
          animatedProps={leftAnimatedProps}
          thumbStyle={[thumbStyle, {left: -actualThumbSize.width / 2}]}
          animatedThumbStyle={leftThumbRangeStyle}
          opacityStyle={leftOpacityStyle}
          onGestureEvent={leftHandler}
        />
        <Thumb
          text={maximumValue?.toString()}
          bgColorLabelView={bgColorLabelView}
          labelStyle={labelStyle}
          alwaysShowValue={alwaysShowValue}
          thumbSize={actualThumbSize}
          thumbComponent={rightThumbComponent}
          animatedProps={rightAnimatedProps}
          thumbStyle={thumbStyle}
          animatedThumbStyle={rightThumbRangeStyle}
          opacityStyle={rightOpacityStyle}
          onGestureEvent={rightHandler}
        />
      </Container>
    </GestureHandlerRootView>
  )
}

const Container = styled(View)((props: ContainerProps) => ({
  justifyContent: 'center',
  width: props.width,
}))

const Tracked = styled(Track)(({theme}: {theme: ITheme}) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme?.colors.primary,
}))

export default SliderFixedRange
