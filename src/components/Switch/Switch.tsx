import React, {useMemo} from 'react'
import {Pressable, Text, View} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import styled from 'styled-components/native'
import {theme as defaultTheme} from '../../theme'
import {
  SPACING_INSIDE,
  SPACING_OUTSIDE,
  SwitchVariant,
  TEXT_INSIDE,
  TEXT_INSIDE_COLOR,
  THUMB_SIZE,
  TRACK_RADIUS,
  TRACK_WIDTH,
} from './constants'

export interface ITrackSize {
  width: number
  height: number
}

export interface SwitchTheme {
  active: string
  inActive: string
}

export interface SwitchProps {
  /**
   * current value of switch
   * default: false
   */
  value: boolean

  /**
   * function call when value changes
   */
  onValueChange: () => void

  /**
   * track color for switch
   * default: defaultTheme.colors.darkText: #27272a
   */
  trackColor?: string | SwitchTheme

  /**
   * thumb size of switch
   * default: 30
   */
  thumbSize?: number

  /**
   * thumb color of switch
   * default: white
   */
  thumbColor?: string | SwitchTheme

  /**
   * variant to render if thumb outside or inside switch
   * default: outside
   */
  variant?: 'inside' | 'outside'

  /**
   * disabled to change switch
   * default: false
   */
  disabled?: boolean

  /**
   * props to show text in switch
   * default: {
   *  active: 'On',
      inActive: 'Off'
   * }
   */
  textInside?: SwitchTheme
  /**
   * props to show text with color in switch
   * default: {
   *  active: 'white',
      inActive: 'black',
   * }
   */
  textInsideColor?: SwitchTheme

  /**
   * number for padding inside trach
   * default: 3
   */
  trackPaddingInside?: number
}

export interface ISwitchContainer {
  trackSize: ITrackSize
  trackMargin: number
}

export interface IThumb {
  thumbSize: number
}

export interface ITrack {
  trackSize: ITrackSize
  thumbSize?: number
}

export interface ILabel {
  color: string
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  trackColor = defaultTheme.colors.darkText,
  thumbSize = THUMB_SIZE,
  thumbColor = defaultTheme.colors.white,
  variant = SwitchVariant.outside,
  disabled,
  textInside = TEXT_INSIDE,
  textInsideColor = TEXT_INSIDE_COLOR,
  trackPaddingInside = SPACING_INSIDE,
}) => {
  const isThumbOutside = useMemo(() => variant === SwitchVariant.outside, [variant])
  const trackSize: ITrackSize = useMemo(() => {
    const width = thumbSize * 2 + TRACK_WIDTH
    let height = 0
    if (isThumbOutside) {
      height = thumbSize - SPACING_OUTSIDE
    } else {
      height = thumbSize + trackPaddingInside * 2
    }
    return {width, height}
  }, [isThumbOutside, thumbSize, trackPaddingInside])
  const trackMargin = useMemo(
    () => (isThumbOutside ? 0 : trackPaddingInside),
    [isThumbOutside, trackPaddingInside],
  )

  // HANDLE ANIMATED STYLE
  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateX = withTiming(value ? trackSize.width - thumbSize - trackMargin * 2 : 0)
    const translateY = trackSize.height / 2 - thumbSize / 2
    const trackActiveColor = typeof thumbColor === 'string' ? thumbColor : thumbColor?.active
    const trackInActiveColor = typeof thumbColor === 'string' ? thumbColor : thumbColor?.inActive
    const backgroundColor = withTiming(value ? trackActiveColor : trackInActiveColor)
    return {
      transform: [{translateX}, {translateY}],
      backgroundColor,
    }
  }, [value, trackSize, thumbSize, trackMargin, thumbColor])
  const trackActiveAnimatedStyle = useAnimatedStyle(() => {
    const translateX = withTiming(value ? 0 : -trackSize.width)
    const backgroundColor = typeof trackColor === 'string' ? trackColor : trackColor?.active
    return {
      transform: [{translateX}],
      backgroundColor,
    }
  }, [value, trackSize, trackColor])
  const trackInActiveAnimatedStyle = useAnimatedStyle(() => {
    const translateX = withTiming(value ? trackSize.width : 0)
    const backgroundColor = typeof trackColor === 'string' ? trackColor : trackColor?.inActive
    return {
      transform: [{translateX}],
      backgroundColor,
    }
  }, [value, trackSize, trackColor])

  return (
    <SwitchContainer
      testID="switch-container"
      disabled={disabled}
      onPress={onValueChange}
      {...{trackSize, trackColor, trackMargin}}>
      <TrackContainer testID="track-container" {...{trackSize}}>
        <TrackActive testID="track-active" style={trackActiveAnimatedStyle} {...{trackSize, thumbSize}}>
          {!isThumbOutside && (
            <Label testID="label-active" color={textInsideColor.active}>
              {textInside.active}
            </Label>
          )}
        </TrackActive>
        <TrackInActive
          testID="track-in-active"
          style={trackInActiveAnimatedStyle}
          {...{trackSize, thumbSize}}>
          {!isThumbOutside && (
            <Label testID="label-in-active" color={textInsideColor.inActive}>
              {textInside?.inActive}
            </Label>
          )}
        </TrackInActive>
      </TrackContainer>
      <Thumb testID="thumb" style={thumbAnimatedStyle} {...{thumbSize, thumbColor}} />
    </SwitchContainer>
  )
}

const SwitchContainer = styled(Pressable)<ISwitchContainer>(({trackSize, trackMargin}) => ({
  width: trackSize.width,
  height: trackSize.height,
  borderRadius: TRACK_RADIUS,
  paddingLeft: trackMargin,
  paddingRight: trackMargin,
}))

const Thumb = styled(Animated.View)<IThumb>(({thumbSize}) => ({
  width: thumbSize,
  height: thumbSize,
  borderRadius: thumbSize,
}))

const TrackContainer = styled(View)<ITrack>(({trackSize}) => ({
  position: 'absolute',
  width: trackSize.width,
  height: trackSize.height,
  borderRadius: TRACK_RADIUS,
  overflow: 'hidden',
}))

const TrackActive = styled(Animated.View)<ITrack>(({trackSize, thumbSize}) => ({
  position: 'absolute',
  width: trackSize.width,
  height: trackSize.height,
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: thumbSize,
}))

const TrackInActive = styled(Animated.View)<ITrack>(({trackSize, thumbSize}) => ({
  position: 'absolute',
  width: trackSize.width,
  height: trackSize.height,
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: thumbSize,
}))

const Label = styled(Text)<ILabel>(({color}) => ({
  color,
}))

export default Switch
