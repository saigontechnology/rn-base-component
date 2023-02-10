import React from 'react'
import type {ImageStyle} from 'react-native'
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Insets,
} from 'react-native'
import {metrics, hitSlop as defaultHitSlop} from '../helpers/metrics'

export type IconProps = {
  source: ImageSourcePropType
  size?: number
  disabled?: boolean
  color?: string
  hitSlop?: Insets
  style?: StyleProp<ImageStyle>
  resizeMode?: ImageResizeMode
  onPress?: () => void
  onLongPress?: () => void
  buttonStyle?: StyleProp<ViewStyle>
}

export const Icon: React.FunctionComponent<IconProps> = ({
  source,
  size = metrics.medium,
  disabled = false,
  color,
  hitSlop = defaultHitSlop,
  style,
  resizeMode = 'contain',
  onPress,
  onLongPress,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity
      disabled={(!onPress && !onLongPress) || disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      style={buttonStyle}
      hitSlop={hitSlop}>
      <Image
        source={source}
        style={[
          {
            width: size,
            height: size,
            tintColor: color,
          },
          StyleSheet.flatten(style),
        ]}
        resizeMode={resizeMode || 'contain'}
      />
    </TouchableOpacity>
  )
}
