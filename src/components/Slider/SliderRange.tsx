import React, {useCallback, useMemo} from 'react'
import {StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {Thumb, Track, TrackPoint} from './components'
import type {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import type {AnimatedGHContext, AnimatedLabelProps, ISliderCommon} from './Slider'
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

type Point = {
  left: number
  right: number
}

type SliderAnimated = {
  opacity: number
  zIndex: number
}

type ContainerProps = {
  width: number
}

type NumberRange = {
  maximum: number
  minimum: number
}

export interface ISliderRange extends ISliderCommon {
  sliderWidth: number

  leftThumbComponent?: React.ReactElement

  rightThumbComponent?: React.ReactElement

  onValueChange?: (value: NumberRange) => void
}

const SliderRange: React.FC<ISliderRange> = ({
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
  hasPointTouch,
  hasTrackPoint,
  sliderWidth,
  thumbSize,
  trackPointStyle,
  onValueChange = () => null,
}) => {
  const totalPoint = useMemo(() => (maximumValue - minimumValue) / step, [maximumValue, minimumValue, step])
  const range = useMemo(() => sliderWidth / totalPoint, [sliderWidth, totalPoint])
  const theme = useTheme()
  const actualThumbSize = thumbSize || {width: theme.sizes.large, height: theme.sizes.large}

  const currentPoint = useSharedValue<Point>({left: INIT_POINT, right: maximumValue})
  const leftProgress = useSharedValue<number>(INIT_VALUE)
  const rightProgress = useSharedValue<number>(sliderWidth)
  const leftAnimated = useSharedValue<SliderAnimated>({opacity: INIT_VALUE, zIndex: INIT_VALUE})
  const rightAnimated = useSharedValue<SliderAnimated>({opacity: INIT_VALUE, zIndex: INIT_VALUE})

  /**
   * This function updates the slider with the new position (progressing) and new point
   * @param {number} progressing - The current position of the thumb on the track
   * @param {number} currentPoint - The current point of the slider
   * @param {string} position - The position indicates the left thumb or the right thumb
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
      const {left, right} = currentPoint.value
      const leftProgressing = ctx.startX + event.translationX
      // Calculate the new slider value based on the leftProgressing (new position) and the range
      const sliderValue = leftProgressing / range

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
        const currentProgress = range * Math.floor(sliderValue)
        const point = Math.floor(sliderValue)
        runOnJS(updateSlider)(currentProgress, point, ThumbPosition.left)
      }
      // When sliding steadily decreases
      else if (leftProgressing < range * (left - PREVIOUS_STEP)) {
        const currentProgress = range * Math.ceil(sliderValue)
        const point = Math.ceil(sliderValue)

        runOnJS(updateSlider)(currentProgress, point, ThumbPosition.left)
      }
    },
    onEnd: () => {
      leftAnimated.value = {...leftAnimated.value, opacity: INVISIBLE}
      runOnJS(onValueChange)({
        minimum: minimumValue + currentPoint.value.left * step,
        maximum: minimumValue + currentPoint.value.right * step,
      })
    },
  })

  const rightHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: (_, ctx) => {
      ctx.startX = rightProgress.value
    },
    onActive: (event, ctx) => {
      const {left, right} = currentPoint.value
      const rightProgressing = ctx.startX + event.translationX
      // Calculate the new slider value based on the rightProgressing (new position) and the range
      const sliderValue = rightProgressing / range
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
        const currentProgress = range * Math.floor(sliderValue)
        const point = Math.floor(sliderValue)
        runOnJS(updateSlider)(currentProgress, point, ThumbPosition.right)
      }
      // When sliding steadily decreases
      else if (rightProgressing < range * (right - PREVIOUS_STEP)) {
        const currentProgress = range * Math.ceil(sliderValue)
        const point = Math.ceil(sliderValue)
        runOnJS(updateSlider)(currentProgress, point, ThumbPosition.right)
      }
    },
    onEnd: () => {
      rightAnimated.value = {...rightAnimated.value, opacity: INVISIBLE}
      runOnJS(onValueChange)({
        minimum: minimumValue + currentPoint.value.left * step,
        maximum: minimumValue + currentPoint.value.right * step,
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
        text: `${minimumValue + currentPoint.value.right * step}`,
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
      const position = point <= currentPoint.value.left ? ThumbPosition.left : ThumbPosition.right
      const positionPoint = range * (point + FIRST_POINT)
      const curPoint = point + FIRST_POINT
      const value = {
        minimum: minimumValue + currentPoint.value.left * step,
        maximum: minimumValue + currentPoint.value.right * step,
      }

      updateSlider(positionPoint, curPoint, position)
      onValueChange(value)
    },
    [currentPoint, minimumValue, onValueChange, range, step, updateSlider],
  )

  return (
    <Container width={sliderWidth} style={style}>
      <Track style={trackStyle} />
      {!!hasTrackPoint && (
        <TrackPoint
          sliderWidth={sliderWidth}
          totalPoint={totalPoint}
          hitSlopPoint={hitSlopPoint}
          trackPointStyle={trackPointStyle}
          activeOpacity={hasPointTouch ? 0 : 1}
          onPressPoint={(point: number) => hasPointTouch && onPressPoint(point)}
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
  )
}

const Container = styled.View((props: ContainerProps) => ({
  justifyContent: 'center',
  width: props.width,
}))

const Tracked = styled(Track)(({theme}: {theme: ITheme}) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme?.colors.primary,
}))

export default SliderRange
