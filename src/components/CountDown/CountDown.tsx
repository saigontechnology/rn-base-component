import React from 'react'
import {View, type StyleProp, type TextStyle, type ViewStyle} from 'react-native'

const DEFAULT_SIZE = 20
const DEFAULT_TIME_TO_SHOW = ['D', 'H', 'M', 'S'] as const

export type ICountDownLabels = {
  days: string
  minutes: string
  hours: string
  seconds: string
}
export type TTimeToShow = (typeof DEFAULT_TIME_TO_SHOW)[number]
export type TCountDownDisplayUnitType = 'single' | 'double'
export type TCountDownLabelPosition = 'top' | 'bottom'

export type ICountDownProps = {
  /** Number of seconds to countdown */
  until: number

  /**
   * What Digits to show
   * Default: ['D','H','M','S']
   */
  timeToShow?: TTimeToShow[]

  /**
   * display unit with 2 or only 1 digit
   * Default: double
   */
  displayUnitType?: TCountDownDisplayUnitType

  /** callback when finish countdown */
  onFinish?: () => void

  /**
   * show separator
   * Default: false
   */
  showSeparator?: boolean

  /** render custom separator */
  renderSeparator?: () => React.ReactNode

  /**
   * size of digit container
   * Default: 20
   */
  size?: number

  /** label text */
  labels?: ICountDownLabels

  /**
   * position for display label
   * Default: bottom
   */
  labelPosition?: TCountDownLabelPosition

  /** define style for container */
  containerStyle?: StyleProp<ViewStyle>

  /** define style for digit & label container */
  itemContainerStyle?: StyleProp<ViewStyle>

  /** define style for digit */
  digitTextStyle?: StyleProp<TextStyle>

  /** define style for digit container */
  digitContainerStyle?: StyleProp<ViewStyle>

  /** define style for label text */
  labelTextStyle?: StyleProp<TextStyle>
}

interface ICountDownRef {}

const CountDown = React.forwardRef<ICountDownRef, ICountDownProps>(
  (
    {
      until,
      timeToShow = DEFAULT_TIME_TO_SHOW,
      displayUnitType = 'double',
      onFinish,
      showSeparator,
      renderSeparator,
      size = DEFAULT_SIZE,
      labels,
      labelPosition = 'bottom',
      containerStyle,
      itemContainerStyle,
      digitStyle,
      digitContainerStyle,
      labelTextStyle,
    },
    ref,
  ) => <View />,
)

export default CountDown
