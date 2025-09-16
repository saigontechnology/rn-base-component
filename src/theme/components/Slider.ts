import type {StyleProp, ViewStyle, TextStyle, Insets} from 'react-native'
// metrics available but not used in default theme values
import base from '../base'

type Size = {
  width: number
  height: number
}

export type SliderThemeProps = {
  /**
   * The maximum value of the slider
   */
  maximumValue: number
  /**
   * The minimum value of the slider
   */
  minimumValue: number
  /**
   * The step value for the slider
   */
  step: number
  /**
   * The alwaysShowValue indicates whether the value of the slider should always be displayed
   */
  alwaysShowValue: boolean
  /**
   * Whether to show the point on the slider's track
   */
  showTrackPoint: boolean
  /**
   * Determines whether the thumb can be moved by directly touching the thumb or only by dragging the slider track
   */
  tapToSeek: boolean
  /**
   * The touchable area is used to increase the size of the thumb and make it easier to interact with
   */
  hitSlopPoint?: Insets | number
  /**
   * Style for the slider component
   */
  style?: StyleProp<ViewStyle>
  /**
   * Style of the slider's track
   */
  trackStyle?: StyleProp<ViewStyle>
  /**
   * Style for the track's filled portion
   */
  trackedStyle?: StyleProp<ViewStyle>
  /**
   * Style of the point on the slider's track
   */
  trackPointStyle?: StyleProp<ViewStyle>
  /**
   * The bgColorLabelView sets the background color of the view that displays the value of the slider
   */
  bgColorLabelView: string
  /**
   * The labelStyle sets the style of the text that displays the value of the slider
   */
  labelStyle?: StyleProp<TextStyle>
  /**
   * Style of the slider's thumb
   */
  thumbStyle?: StyleProp<ViewStyle>
  /**
   * Size of the slider's thumb
   */
  thumbSize: Size
  /**
   * Track height
   */
  trackHeight: number
  /**
   * Track background color
   */
  trackBackgroundColor: string
  /**
   * Track filled color
   */
  trackFilledColor: string
  /**
   * Thumb background color
   */
  thumbBackgroundColor: string
  /**
   * Thumb border color
   */
  thumbBorderColor: string
  /**
   * Thumb border width
   */
  thumbBorderWidth: number
}

const DEFAULT_MINIMUM_VALUE = 0
const DEFAULT_MAXIMUM_VALUE = 100
const DEFAULT_STEP = 1

export const SliderTheme: SliderThemeProps = {
  maximumValue: DEFAULT_MAXIMUM_VALUE,
  minimumValue: DEFAULT_MINIMUM_VALUE,
  step: DEFAULT_STEP,
  alwaysShowValue: false,
  showTrackPoint: false,
  tapToSeek: true,
  hitSlopPoint: {top: 10, bottom: 10, left: 10, right: 10},
  style: undefined,
  trackStyle: {
    height: 4,
    borderRadius: 2,
    backgroundColor: base.colors.backgroundSecondary,
  },
  trackedStyle: {
    backgroundColor: base.colors.primary,
  },
  trackPointStyle: {
    width: 2,
    height: 4,
    backgroundColor: base.colors.gray,
  },
  bgColorLabelView: base.colors.black,
  labelStyle: {
    color: base.colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  thumbStyle: {
    backgroundColor: base.colors.white,
    borderColor: base.colors.primary,
    borderWidth: 2,
    shadowColor: base.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  thumbSize: {
    width: 20,
    height: 20,
  },
  trackHeight: 4,
  trackBackgroundColor: base.colors.backgroundSecondary,
  trackFilledColor: base.colors.primary,
  thumbBackgroundColor: base.colors.white,
  thumbBorderColor: base.colors.primary,
  thumbBorderWidth: 2,
}
