import React from 'react'
import type {Insets, StyleProp, ViewStyle} from 'react-native'
import styled from 'styled-components/native'
import type {FlexDirection, Position, TrackPointStyle} from '../Slider'
import type {ITheme} from '../../../theme'
import {FIRST_POINT} from '../constants'

interface TrackPointProps {
  sliderWidth: number
  totalPoint: number
  hitSlopPoint?: Insets | number
  activeOpacity?: number
  trackPointStyle?: StyleProp<ViewStyle>
  onPressPoint?: (point: number) => void
}

const TrackPoint: React.FunctionComponent<TrackPointProps> = React.memo(
  ({
    sliderWidth,
    totalPoint,
    trackPointStyle,
    hitSlopPoint,
    activeOpacity,
    onPressPoint,
  }: TrackPointProps) => {
    // We don't need to display the first point on the track, so we removed it using totalPoint - 1
    const range = sliderWidth / totalPoint - FIRST_POINT

    // Render the track points based on the range
    return (
      <TrackPointComponent width={sliderWidth}>
        {/**
         * Loop through the range of the slider track and render a point for each value
         */}
        {Array(totalPoint - FIRST_POINT)
          .fill(0)
          .map((_, i) => (
            <Point
              testID="slider-point"
              key={i}
              hitSlop={hitSlopPoint}
              onPress={() => onPressPoint?.(i)}
              activeOpacity={activeOpacity}
              style={[trackPointStyle, {left: range * (i + FIRST_POINT)}]}
            />
          ))}
      </TrackPointComponent>
    )
  },
)

const TrackPointComponent = styled.View((props: TrackPointStyle) => ({
  width: props.width,
  flexDirection: 'row' as FlexDirection,
  height: '100%',
  position: 'absolute' as Position,
  overflow: 'hidden',
}))

const Point = styled.TouchableOpacity(({theme}: {theme: ITheme}) => ({
  height: '100%',
  width: 1,
  backgroundColor: theme.colors.primary,
}))

TrackPoint.displayName = 'TrackPoint'

export {TrackPoint}
