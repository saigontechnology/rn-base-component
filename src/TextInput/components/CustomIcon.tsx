import React from 'react'
import type {ImageResizeMode, ImageSourcePropType, ImageStyle, StyleProp, ViewStyle} from 'react-native'
import styled from 'styled-components/native'
import {metrics} from '../../helpers/metrics'
import {Icon} from '../../Icon/Icon'

export interface CustomIconProps {
  source: ImageSourcePropType
  size?: number
  color?: string
  resizeMode?: ImageResizeMode
  iconContainerStyle?: StyleProp<ViewStyle>
  iconStyle?: StyleProp<ImageStyle>
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export const CustomIcon: React.FC<CustomIconProps> = ({
  source,
  size,
  color,
  resizeMode,
  iconContainerStyle,
  iconStyle,
  onPress = () => null,
}) => (
  <IconWrapper testID="icon-container" style={iconContainerStyle}>
    <Icon
      testID="icon"
      source={source}
      size={size}
      color={color}
      resizeMode={resizeMode}
      style={iconStyle}
      onPress={onPress}
    />
  </IconWrapper>
)

const IconWrapper = styled.View`
  margin-horizontal: ${metrics.xxs};
`
