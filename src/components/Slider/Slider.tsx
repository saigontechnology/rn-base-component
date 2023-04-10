import React, {useCallback, useMemo} from 'react'
import type {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import {hitSlop, metrics} from '../../helpers/metrics'
import SliderRange, {ISliderRange} from './SliderRange'
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
  FIRST_POINT,
  INIT_POINT,
  INIT_VALUE,
  INVISIBLE,
  MINIMUM_TRACK_WIDTH,
  NEXT_STEP,
  PREVIOUS_STEP,
  VISIBLE,
} from './constants'

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
  /** custom element that can be used to replace the default thumb of the slider */
  thumbComponent?: React.ReactElement

  /** Callback function to handle the change in slider value */
  onValueChange?: (value: number) => void
}

type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse'
type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'
type TextAlign = 'center' | 'end' | 'justify' | 'left' | 'match-parent' | 'right' | 'start'

export interface ISliderCommon {
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
  | {hasTrackPoint: true; sliderWidth: number}
  | {hasTrackPoint?: false; sliderWidth?: number}
)

type SliderProps = ISliderCommon & ISlider & SliderPropsWithOptionalWidth

type SliderComponentProps = React.FC<SliderProps> & {
  Range: React.FC<ISliderRange>
}

const Slider: SliderComponentProps = ({
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
  hasTrackPoint,
  hasPointTouch,
  hitSlopPoint = hitSlop,
  sliderWidth,
  thumbSize = {width: metrics.medium, height: metrics.medium},
  trackPointStyle,
  onValueChange = () => null,
}: SliderProps) => {
  const sliderInfo = useSharedValue<SliderInfo>({range: INIT_VALUE, trackWidth: INIT_VALUE})
  const currentPoint = useSharedValue<number>(INIT_POINT)
  const progress = useSharedValue<number>(INIT_VALUE)
  const opacity = useSharedValue(INIT_VALUE)

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
      else if (progressing > range * (currentPoint.value + NEXT_STEP)) {
        const currentProgress = range * Math.floor(sliderValue)
        const point = Math.floor(sliderValue)

        runOnJS(updateSlider)(currentProgress, point)
      }
      // When sliding steadily decreases
      else if (progressing < range * (currentPoint.value - PREVIOUS_STEP)) {
        const currentProgress = range * Math.ceil(sliderValue)
        const point = Math.ceil(sliderValue)

        runOnJS(updateSlider)(currentProgress, point)
      }
    },
    onEnd: () => {
      opacity.value = INVISIBLE
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
    <Container style={[!!sliderWidth && {width: sliderWidth}, style]}>
      <Track style={trackStyle} onLayout={getTrackWidth} />
      {!!hasTrackPoint && (
        <TrackPoint
          sliderWidth={sliderWidth}
          totalPoint={totalPoint}
          hitSlopPoint={hitSlopPoint}
          activeOpacity={hasPointTouch ? 0 : 1}
          trackPointStyle={trackPointStyle}
          onPressPoint={(point: number) => hasPointTouch && onPressPoint(point)}
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

const Container = styled.View({
  justifyContent: 'center',
})

const Tracked = styled(Track)(({theme}: {theme: ITheme}) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme?.colors.primary,
}))

Slider.Range = SliderRange

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
