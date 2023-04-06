import React, {useCallback, useMemo} from 'react'
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  LayoutChangeEvent,
  TextInputProps,
  TextProps,
  Insets,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated'
import type {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import {metrics} from '../../helpers/metrics'
import {colors} from '../../helpers/colors'
import styled from 'styled-components/native'
import SliderRange from './SliderRange'
import {DEFAULT_STEP, FIRST_POINT, MINIMUM_TRACK_WIDTH} from './Constants'
import {Thumb, TrackPoint} from './components'

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
  thumbSize: Size
  hasThumbComponent?: boolean
}

type TrackStyle = {
  backgroundColor: string
}

type TrackPointStyle = {
  width: number
}

interface AnimatedLabelProps extends TextInputProps {
  text: string
}

type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse'
type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'

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
  hasTrackPoint?: boolean

  /** Determines whether the thumb can be moved by directly touching the thumb or only by dragging the slider track */
  hasPointTouch?: boolean

  /** The touchable area is used to increase the size of the thumb and make it easier to interact with */
  hitSlopPoint?: Insets | number

  /** Style of the slider's track */
  trackStyle?: StyleProp<ViewStyle>

  /** The bgColorTrack sets the background color of the slider's track */
  bgColorTrack?: string

  /** The bgColorTracked sets the background color of the part of the track that has been selected */
  bgColorTracked?: string

  /** Style of the point on the slider's track */
  trackPointStyle?: StyleProp<ViewStyle>

  /** The bgColorLabelView sets the background color of the view that displays the value of the slider */
  bgColorLabelView?: string

  /** The labelStyle sets the style of the text that displays the value of the slider */
  labelStyle?: StyleProp<TextProps>

  /** Style of the slider's thumb */
  thumbStyle?: StyleProp<ViewStyle>

  /** custom element that can be used to replace the default thumb of the slider */
  thumbComponent?: React.ReactElement

  /** Size of the slider's thumb */
  thumbSize?: Size

  /** Callback function to handle the change in slider value */
  onValueChange?: (value: number | {minimum: number; maximum: number}) => void
}

type SliderPropsWithOptionalWidth = {sliderWidth?: number} & (
  | {hasTrackPoint: true; sliderWidth: number}
  | {hasTrackPoint?: false; sliderWidth?: number}
)

type SliderProps = SliderCommonProps & SliderPropsWithOptionalWidth

type SliderComponentProps = React.FunctionComponent<SliderProps> & {
  Range: React.FunctionComponent<SliderProps>
}

const Slider: SliderComponentProps = ({
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
}: SliderProps) => {
  const sliderInfo = useSharedValue<SliderInfo>({range: 0, trackWidth: 0})
  const currentPoint = useSharedValue<number>(FIRST_POINT)
  const progress = useSharedValue<number>(0)
  const opacity = useSharedValue(0)

  const totalPoint = useMemo(() => (maximumValue - minimumValue) / step, [maximumValue, minimumValue, step])

  /**
   * This function updates the slider with the new position (progressing) and new point
   * @param {number} progressing - The current position of the thumb on the track
   * @param {number} currentPoint - The current point of the slider
   */
  const updateSlider = useCallback(
    (progressing: number, point: number) => {
      progress.value = progressing
      currentPoint.value = point
    },
    [currentPoint, progress],
  )

  const handler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: (_, ctx) => {
      ctx.startX = progress.value
    },
    onActive: (event, ctx) => {
      const {trackWidth, range} = sliderInfo.value
      const progressing = ctx.startX + event.translationX
      // Calculate the new slider value based on the progressing (new position) and the range
      const sliderValue = progressing / range
      let currentProgress = 0
      let point = 0

      opacity.value = 1

      // When sliding the thumb across a distance shorter than the track's width
      if (progressing < MINIMUM_TRACK_WIDTH) {
        runOnJS(updateSlider)(MINIMUM_TRACK_WIDTH, FIRST_POINT)
      }
      // When sliding the thumb over the track's width
      else if (progressing > trackWidth) {
        runOnJS(updateSlider)(trackWidth, totalPoint)
      }
      // When sliding steadily increases
      else if (progressing > range * (currentPoint.value + 1)) {
        currentProgress = range * Math.floor(sliderValue)
        point = Math.floor(sliderValue)

        runOnJS(updateSlider)(currentProgress, point)
      }
      // When sliding steadily decreases
      else if (progressing < range * (currentPoint.value - 1)) {
        currentProgress = range * Math.floor(sliderValue + 1)
        point = Math.floor(sliderValue + 1)

        runOnJS(updateSlider)(currentProgress, point)
      }
    },
    onEnd: () => {
      opacity.value = 0
      runOnJS(onValueChange)(minimumValue + currentPoint.value * step)
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
      duration: 200,
    }),
  }))

  /**
   * Display the current slider value in real time as the user slides the thumb along the slider track
   */
  const animatedProps = useAnimatedProps(
    () =>
      ({
        text: `${minimumValue + currentPoint.value * step}`,
      } as AnimatedLabelProps),
  )

  const getTrackWidth = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout
    // Range refers to the width of a point
    // It is used to calculate the correct position of the slider while sliding
    const range = width / totalPoint
    sliderInfo.value = {range: range, trackWidth: width}
  }

  return (
    <Container style={!!sliderWidth && {width: sliderWidth}}>
      <Track
        backgroundColor={bgColorTrack}
        style={[trackStyle, (hasTrackPoint || !!sliderWidth) && {width: sliderWidth}]}
        onLayout={getTrackWidth}
      />
      {!!hasTrackPoint && (
        <TrackPoint sliderWidth={sliderWidth} totalPoint={totalPoint} trackPointStyle={trackPointStyle} />
      )}
      <Tracked
        backgroundColor={bgColorTracked}
        style={[trackStyle, hasTrackPoint && {width: sliderWidth}, animatedTrackStyle]}
      />
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

Slider.Range = SliderRange

export {
  Size,
  SliderInfo,
  AnimatedGHContext,
  ThumbContainerStyle,
  SliderProps,
  SliderPropsWithOptionalWidth,
  AnimatedLabelProps,
  TrackStyle,
  TrackPointStyle,
  FlexDirection,
  Position,
}
export default Slider
