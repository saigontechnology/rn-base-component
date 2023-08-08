import React, {useCallback, useMemo} from 'react'
import type {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import {hitSlop, metrics} from '../../helpers/metrics'
import {Thumb, Track, TrackPoint} from './components'
import styled from 'styled-components/native'
import type {ITheme} from '../../theme'
import {StyleSheet, LayoutChangeEvent, View} from 'react-native'
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
  VISIBLE,
} from './constants'
import type {AnimatedGHContext, AnimatedLabelProps, SliderInfo, SliderProps} from './Slider'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

const SliderFixed: React.FC<SliderProps> = ({
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
  thumbComponent,
  showTrackPoint,
  tapToSeek,
  hitSlopPoint = hitSlop,
  sliderWidth,
  thumbSize = {width: metrics.medium, height: metrics.medium},
  trackPointStyle,
  onValueChange = () => null,
}) => {
  const sliderInfo = useSharedValue<SliderInfo>({range: INIT_VALUE, trackWidth: INIT_VALUE})
  const sliderValue = useSharedValue<number>(INIT_POINT)
  const progress = useSharedValue<number>(INIT_VALUE)
  const opacity = useSharedValue(INIT_VALUE)

  const totalPoint = useMemo(() => (maximumValue - minimumValue) / step, [maximumValue, minimumValue, step])

  /**
   * This function updates the slider with the new position (progressing) and new point
   * @param {number} progressing - The current position of the thumb on the track
   * @param {number} value - The value of the slider
   */
  const updateSlider = useCallback(
    (progressing: number, value: number) => {
      progress.value = progressing
      sliderValue.value = value
    },
    [sliderValue, progress],
  )

  const handler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: (_, ctx) => {
      ctx.startX = progress.value
    },
    onActive: (event, ctx) => {
      const {trackWidth, range} = sliderInfo.value
      const progressing = ctx.startX + event.translationX
      // Calculate the ratio of the current thumb position with respect to the entire range of the slider
      const progressRatio = progressing / range
      opacity.value = VISIBLE

      // When sliding the thumb across a distance shorter than the track's width
      if (progressing < MINIMUM_TRACK_WIDTH) {
        runOnJS(updateSlider)(MINIMUM_TRACK_WIDTH, INIT_POINT)
      }
      // When sliding the thumb over the track's width
      else if (progressing > trackWidth) {
        runOnJS(updateSlider)(trackWidth, totalPoint)
      }
      // When sliding steadily increases
      else if (progressing > range * (sliderValue.value + NEXT_STEP)) {
        const currentProgress = range * Math.floor(progressRatio)
        const point = Math.floor(progressRatio)

        runOnJS(updateSlider)(currentProgress, point)
      }
      // When sliding steadily decreases
      else if (progressing < range * (sliderValue.value - PREVIOUS_STEP)) {
        const currentProgress = range * Math.ceil(progressRatio)
        const point = Math.ceil(progressRatio)

        runOnJS(updateSlider)(currentProgress, point)
      }
    },
    onEnd: () => {
      opacity.value = INVISIBLE
      runOnJS(onValueChange)(minimumValue + sliderValue.value * step)
    },
  })

  /**
   * Update the tracked width based on the thumb sliding
   */
  const animatedTrackStyle = useAnimatedStyle(() => ({
    width: progress.value,
  }))

  /**
   * Add animation to the thumb while it's sliding
   */
  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(progress.value, {duration: 1})}],
  }))

  /**
   * Update opacity when touching the thumb
   * This animation should run within 200ms when the thumb is touched or released
   */
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {
      duration: DURATION,
    }),
  }))

  /**
   * Display the current slider value in real time as the user slides the thumb along the slider track
   */
  const animatedProps = useAnimatedProps(
    () =>
      ({
        text: `${minimumValue + sliderValue.value * step}`,
      } as AnimatedLabelProps),
  )

  const getTrackWidth = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout
    // Range refers to the width of a point
    // It is used to calculate the correct position of the slider while sliding
    const range = width / totalPoint
    sliderInfo.value = {range: range, trackWidth: width}
  }

  /**
   * Function called when the user presses on a point on the slider's track
   * Calculates the position of the pressed point on the slider's track and updates the slider's state accordingly
   * @param {number} point - The index of the point on the slider's track that was pressed by the user
   */
  const onPressPoint = useCallback(
    (point: number) => {
      const positionPoint = sliderInfo.value.range * (point + FIRST_POINT)
      const curPoint = point + FIRST_POINT
      const value = minimumValue + curPoint * step

      updateSlider(positionPoint, curPoint)
      onValueChange(value)
    },
    [minimumValue, onValueChange, sliderInfo.value.range, step, updateSlider],
  )

  return (
    <GestureHandlerRootView>
      <Container style={[!!sliderWidth && {width: sliderWidth}, style]}>
        <Track style={trackStyle} onLayout={getTrackWidth} />
        {!!showTrackPoint && (
          <TrackPoint
            sliderWidth={sliderWidth}
            totalPoint={totalPoint}
            hitSlopPoint={hitSlopPoint}
            activeOpacity={tapToSeek ? 0 : 1}
            trackPointStyle={trackPointStyle}
            onPressPoint={(point: number) => tapToSeek && onPressPoint(point)}
          />
        )}
        <Tracked style={[trackedStyle, animatedTrackStyle]} />
        <Thumb
          text={minimumValue?.toString()}
          bgColorLabelView={bgColorLabelView}
          labelStyle={labelStyle}
          alwaysShowValue={alwaysShowValue}
          thumbSize={thumbSize}
          thumbComponent={thumbComponent}
          animatedProps={animatedProps}
          thumbStyle={[thumbStyle, {left: -thumbSize.width / 2}]}
          animatedThumbStyle={animatedThumbStyle}
          opacityStyle={opacityStyle}
          onGestureEvent={handler}
        />
      </Container>
    </GestureHandlerRootView>
  )
}

const Container = styled(View)({
  justifyContent: 'center',
})

const Tracked = styled(Track)(({theme}: {theme: ITheme}) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme?.colors.primary,
}))

export default SliderFixed
