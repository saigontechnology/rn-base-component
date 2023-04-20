import React, {useCallback, useMemo} from 'react'
import type {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import {hitSlop, metrics} from '../../helpers/metrics'
import SliderFixedRange, {SliderFixedRangeProps} from './SliderFixedRange'
import {Thumb, Track, TrackPoint} from './components'
import styled from 'styled-components/native'
import type {ITheme} from '../../theme'
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  LayoutChangeEvent,
  TextInputProps,
  Insets,
  TextStyle,
} from 'react-native'
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
  VISIBLE,
} from './constants'
import SliderFixed from './SliderFixed'
import SliderRange, {SliderRangeProps} from './SliderRange'

type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse'
type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'
type TextAlign = 'center' | 'end' | 'justify' | 'left' | 'match-parent' | 'right' | 'start'

type Size = {
  width: number
  height: number
}

type SliderInfo = {
  range: number
  trackWidth: number
}

type AnimatedGHContext = {
  startX: number
  currentPoint: number
}

type ThumbContainerStyle = {
  theme?: ITheme
  thumbSize: Size
  hasThumbComponent?: boolean
  background?: string
}

type TrackPointStyle = {
  width: number
}

interface AnimatedLabelProps extends TextInputProps {
  text: string
}

type ISlider = {
  /** The value to which the slider thumb should be rounded */
  roundToValue?: number

  /** custom element that can be used to replace the default thumb of the slider */
  thumbComponent?: React.ReactElement

  /** Callback function to handle the change in slider value */
  onValueChange?: (value: number) => void
}

export interface SliderCommonProps {
  /** The maximum value of the slider */
  maximumValue?: number

  /** The minimum value of the slider */
  minimumValue?: number

  /** The step value for the slider */
  step?: number

  /** The alwaysShowValue indicates whether the value of the slider should always be displayed */
  alwaysShowValue?: boolean

  /** Whether to show the point on the slider's track */
  showTrackPoint?: boolean

  /** Determines whether the thumb can be moved by directly touching the thumb or only by dragging the slider track */
  tapToSeek?: boolean

  /** The touchable area is used to increase the size of the thumb and make it easier to interact with */
  hitSlopPoint?: Insets | number

  /** Style for the slider component. */
  style?: StyleProp<ViewStyle>

  /** Style of the slider's track */
  trackStyle?: StyleProp<ViewStyle>

  /** Style for the track's filled portion (in case of a range slider) */
  trackedStyle?: StyleProp<ViewStyle>

  /** Style of the point on the slider's track */
  trackPointStyle?: StyleProp<ViewStyle>

  /** The bgColorLabelView sets the background color of the view that displays the value of the slider */
  bgColorLabelView?: string

  /** The labelStyle sets the style of the text that displays the value of the slider */
  labelStyle?: StyleProp<TextStyle>

  /** Style of the slider's thumb */
  thumbStyle?: StyleProp<ViewStyle>

  /** Size of the slider's thumb */
  thumbSize?: Size
}

type SliderPropsWithOptionalWidth = {sliderWidth?: number} & (
  | {showTrackPoint: true; sliderWidth: number}
  | {showTrackPoint?: false; sliderWidth?: number}
)

type SliderProps = SliderCommonProps & ISlider & SliderPropsWithOptionalWidth

type SliderComponentProps = React.FC<SliderProps> & {
  Range: React.FC<SliderRangeProps>
  FixedRange: React.FC<SliderFixedRangeProps>
  Fixed: React.FC<SliderProps>
}

const Slider: SliderComponentProps = ({
  minimumValue = DEFAULT_MINIMUM_VALUE,
  maximumValue = DEFAULT_MAXIMUM_VALUE,
  step,
  roundToValue,
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
}: SliderProps) => {
  const sliderInfo = useSharedValue<SliderInfo>({
    range: INIT_VALUE,
    trackWidth: INIT_VALUE,
  })
  const sliderValue = useSharedValue<number>(INIT_POINT)
  const progress = useSharedValue<number>(INIT_VALUE)
  const opacity = useSharedValue(INIT_VALUE)
  const stepValue = useMemo(() => step || DEFAULT_STEP, [step])

  const totalPoint = useMemo(
    () => (maximumValue - minimumValue) / stepValue,
    [maximumValue, minimumValue, stepValue],
  )

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
      const {trackWidth} = sliderInfo.value
      const progressing = ctx.startX + event.translationX

      opacity.value = VISIBLE

      // When sliding the thumb across a distance shorter than the track's width
      if (progressing < MINIMUM_TRACK_WIDTH) {
        runOnJS(updateSlider)(MINIMUM_TRACK_WIDTH, minimumValue)
      }
      // When sliding the thumb over the track's width
      else if (progressing > trackWidth) {
        runOnJS(updateSlider)(trackWidth, maximumValue)
      } else {
        const value = progressing / (trackWidth / (maximumValue - minimumValue))
        runOnJS(updateSlider)(progressing, value + minimumValue)
      }
    },
    onEnd: () => {
      const {range} = sliderInfo.value
      let value = roundToValue ? sliderValue.value.toFixed(roundToValue) : sliderValue.value
      opacity.value = INVISIBLE
      if (step) {
        // Calculate the ratio of the current thumb position with respect to the entire range of the slider
        const progressRatio = Math.round(progress.value / range)
        value = minimumValue + progressRatio * stepValue
        const roundedProgress = progressRatio * range
        runOnJS(updateSlider)(roundedProgress, value)
      }
      runOnJS(onValueChange)(value as number)
    },
  })

  /**
   * Update the tracked width based on the thumb sliding
   */
  const animatedTrackStyle = useAnimatedStyle(
    () => ({
      width: withTiming(progress.value, {duration: 1}),
    }),
    [progress],
  )

  /**
   * Add animation to the thumb while it's sliding
   */
  const animatedThumbStyle = useAnimatedStyle(
    () => ({
      transform: [{translateX: progress.value}],
    }),
    [progress],
  )

  /**
   * Update opacity when touching the thumb
   * This animation should run within 200ms when the thumb is touched or released
   */
  const opacityStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(opacity.value, {
        duration: DURATION,
      }),
    }),
    [opacity],
  )

  /**
   * Display the current slider value in real time as the user slides the thumb along the slider track
   */
  const animatedProps = useAnimatedProps(
    () =>
      ({
        text: `${roundToValue !== undefined ? sliderValue.value.toFixed(roundToValue) : sliderValue.value}`,
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
      const value = minimumValue + curPoint * stepValue

      updateSlider(positionPoint, value)
      onValueChange(value)
    },
    [minimumValue, onValueChange, sliderInfo.value.range, stepValue, updateSlider],
  )

  return (
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
  )
}

const Container = styled.View(({theme}: {theme: ITheme}) => ({
  justifyContent: 'center',
  height: theme.sizes.xxs,
}))

const Tracked = styled(Track)(({theme}: {theme: ITheme}) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme?.colors.primary,
}))

Slider.Range = SliderRange
Slider.FixedRange = SliderFixedRange
Slider.Fixed = SliderFixed

export type {
  Size,
  SliderInfo,
  AnimatedGHContext,
  ThumbContainerStyle,
  SliderProps,
  SliderPropsWithOptionalWidth,
  AnimatedLabelProps,
  TrackPointStyle,
  FlexDirection,
  Position,
  TextAlign,
}
export default Slider
