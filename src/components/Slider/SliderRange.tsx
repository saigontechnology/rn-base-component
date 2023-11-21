import React, {useCallback, useMemo} from 'react'
import {StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {Thumb, Track, TrackPoint} from './components'
import {GestureHandlerRootView, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import type {AnimatedGHContext, AnimatedLabelProps, ISliderCommonProps} from './Slider'
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
  THUMB_POSITION,
  VISIBLE,
} from './constants'
import {useTheme} from '../../hooks'
import {hitSlop} from '../../helpers/metrics'

export type Value = {
  left: number
  right: number
}

export type SliderAnimated = {
  opacity: number
  zIndex: number
}

export type ContainerProps = {
  width: number
}

export type NumberRange = {
  maximum: number
  minimum: number
}

export interface SliderRangeProps extends ISliderCommonProps {
  roundToValue?: number

  sliderWidth: number

  leftThumbComponent?: React.ReactElement

  rightThumbComponent?: React.ReactElement

  onValueChange?: (value: NumberRange) => void
}

const SliderRange: React.FC<SliderRangeProps> = ({
  minimumValue = DEFAULT_MINIMUM_VALUE,
  maximumValue = DEFAULT_MAXIMUM_VALUE,
  step,
  style,
  trackStyle,
  trackedStyle,
  thumbStyle,
  bgColorLabelView,
  roundToValue,
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
  const stepValue = useMemo(() => step || DEFAULT_STEP, [step])
  const totalPoint = useMemo(
    () => (maximumValue - minimumValue) / stepValue,
    [maximumValue, minimumValue, stepValue],
  )
  const range = useMemo(() => sliderWidth / totalPoint, [sliderWidth, totalPoint])
  const theme = useTheme()
  const actualThumbSize = thumbSize || {
    width: theme.sizes.large,
    height: theme.sizes.large,
  }

  const sliderValue = useSharedValue<Value>({
    left: INIT_POINT,
    right: maximumValue,
  })
  const leftProgress = useSharedValue<number>(INIT_VALUE)
  const rightProgress = useSharedValue<number>(sliderWidth)
  const leftAnimated = useSharedValue<SliderAnimated>({
    opacity: INIT_VALUE,
    zIndex: INIT_VALUE,
  })
  const rightAnimated = useSharedValue<SliderAnimated>({
    opacity: INIT_VALUE,
    zIndex: INIT_VALUE,
  })

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
      const {right} = sliderValue.value
      const leftProgressing = ctx.startX + event.translationX

      leftAnimated.value = {zIndex: VISIBLE, opacity: VISIBLE}
      rightAnimated.value = {zIndex: INVISIBLE, opacity: INVISIBLE}

      leftProgress.value =
        leftProgressing < MINIMUM_TRACK_WIDTH
          ? 0
          : leftProgressing > rightProgress.value
          ? rightProgress.value
          : leftProgressing

      // When sliding the thumb across a distance shorter than the track's width
      if (leftProgressing < MINIMUM_TRACK_WIDTH) {
        runOnJS(updateSlider)(MINIMUM_TRACK_WIDTH, minimumValue, THUMB_POSITION.left)
      }
      // When sliding the thumb over the track's width
      else if (leftProgressing > rightProgress.value) {
        runOnJS(updateSlider)(rightProgress.value, right, THUMB_POSITION.left)
      }
      // When sliding steadily increases
      else if (leftProgressing >= rightProgress.value) {
        runOnJS(updateSlider)(rightProgress.value, right, THUMB_POSITION.left)
      }
      // When sliding steadily decreases
      else {
        const currentProgressValue = leftProgressing / (sliderWidth / (maximumValue - minimumValue))
        const value = currentProgressValue + minimumValue
        const roundedValue = roundToValue ? value.toFixed(roundToValue) : value
        runOnJS(updateSlider)(leftProgressing, roundedValue as number, THUMB_POSITION.left)
      }
    },
    onEnd: () => {
      // This line sets the opacity of the left label animated
      leftAnimated.value = {...leftAnimated.value, opacity: INVISIBLE}
      let value = sliderValue.value.left

      if (step) {
        // Calculate the ratio of the current left thumb position with respect to the entire range of the slider
        const leftProgressRatio = Math.round(leftProgress.value / range)
        value = minimumValue + leftProgressRatio * stepValue
        const roundedProgress = leftProgressRatio * range
        runOnJS(updateSlider)(roundedProgress, value, THUMB_POSITION.left)
      }

      runOnJS(onValueChange)({
        minimum: value as number,
        maximum: sliderValue.value.right,
      })
    },
  })

  const rightHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: (_, ctx) => {
      ctx.startX = rightProgress.value
    },
    onActive: (event, ctx) => {
      const {left} = sliderValue.value
      const rightProgressing = ctx.startX + event.translationX
      leftAnimated.value = {zIndex: INVISIBLE, opacity: INVISIBLE}
      rightAnimated.value = {zIndex: VISIBLE, opacity: VISIBLE}

      rightProgress.value =
        rightProgressing < leftProgress.value
          ? leftProgress.value
          : rightProgressing > sliderWidth
          ? sliderWidth
          : rightProgressing

      // When sliding the thumb across a distance shorter than the track's width
      if (rightProgressing < leftProgress.value) {
        runOnJS(updateSlider)(leftProgress.value, left, THUMB_POSITION.right)
      }
      // When sliding the thumb over the track's width
      else if (rightProgressing > sliderWidth) {
        runOnJS(updateSlider)(sliderWidth, maximumValue, THUMB_POSITION.right)
      }
      // When sliding steadily increases
      else if (rightProgressing <= leftProgress.value) {
        runOnJS(updateSlider)(leftProgress.value, left, THUMB_POSITION.right)
      }
      // When sliding steadily decreases
      else {
        const currentProgressValue = rightProgressing / (sliderWidth / (maximumValue - minimumValue))
        const value = currentProgressValue + minimumValue
        const roundedValue = roundToValue ? value.toFixed(roundToValue) : value
        runOnJS(updateSlider)(rightProgressing, roundedValue as number, THUMB_POSITION.right)
      }
    },
    onEnd: () => {
      // This line sets the opacity of the right label animated
      rightAnimated.value = {...rightAnimated.value, opacity: INVISIBLE}
      let value = sliderValue.value.right

      if (step) {
        // Calculate the ratio of the current right thumb position with respect to the entire range of the slider
        const rightProgressRatio = Math.round(rightProgress.value / range)
        value = minimumValue + rightProgressRatio * stepValue
        const roundedProgress = rightProgressRatio * range
        runOnJS(updateSlider)(roundedProgress, value, THUMB_POSITION.right)
      }
      runOnJS(onValueChange)({
        minimum: sliderValue.value.left,
        maximum: value as number,
      })
    },
  })

  const leftThumbRangeStyle = useAnimatedStyle(() => ({
    transform: [{translateX: leftProgress.value}],
    zIndex: leftAnimated.value.zIndex,
  }))

  const rightThumbRangeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: rightProgress.value - actualThumbSize.width / 2,
      },
    ],
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
        text: `${sliderValue.value.left}`,
      } as AnimatedLabelProps),
  )

  const rightAnimatedProps = useAnimatedProps(
    () =>
      ({
        text: `${sliderValue.value.right}`,
      } as AnimatedLabelProps),
  )

  /**
   * Update the tracked width based on the thumb sliding
   */
  const animatedTrackStyle = useAnimatedStyle(() => {
    const width = rightProgress.value - leftProgress.value
    const transform = [{translateX: leftProgress.value}]
    return {transform, width}
  }, [rightProgress, leftProgress])

  /**
   * Function called when the user presses on a point on the slider's track
   * Calculates the position of the pressed point on the slider's track and updates the slider's state accordingly
   * @param {number} point - The index of the point on the slider's track that was pressed by the user
   */
  const onPressPoint = useCallback(
    (point: number) => {
      const {left, right} = sliderValue.value
      const curPoint = point + FIRST_POINT
      const isPointToLeft = point <= left
      const pointValue = minimumValue + curPoint * stepValue
      const value = {
        minimum: isPointToLeft ? pointValue : left,
        maximum: isPointToLeft ? right : pointValue,
      }
      updateSlider(range * curPoint, pointValue, isPointToLeft ? THUMB_POSITION.left : THUMB_POSITION.right)
      onValueChange(value)
    },
    [sliderValue, minimumValue, onValueChange, range, stepValue, updateSlider],
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
        <Track
          style={StyleSheet.flatten([
            StyleSheet.absoluteFillObject,
            {backgroundColor: theme?.colors.primary},
            trackedStyle,
            animatedTrackStyle,
          ])}
        />
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

const Container = styled.View<ContainerProps>(props => ({
  justifyContent: 'center',
  width: props.width,
}))

export default SliderRange
