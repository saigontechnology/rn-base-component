import React from 'react'
import type {
  ImageStyle,
  ImageSourcePropType,
  ImageResizeMode,
  StyleProp,
  ViewStyle,
  Insets,
} from 'react-native'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import {metrics, hitSlop as defaultHitSlop} from '../../helpers/metrics'

export type IconProps = {
  source: ImageSourcePropType
  size?: number
  disabled?: boolean
  color?: string
  hitSlop?: Insets
  style?: StyleProp<ImageStyle>
  resizeMode?: ImageResizeMode
  testID?: string
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
  testID,
  onPress,
  onLongPress,
  buttonStyle,
}) => (
  <TouchableOpacity
    testID={testID}
    disabled={(!onPress && !onLongPress) || disabled}
    onPress={onPress}
    onLongPress={onLongPress}
    style={buttonStyle}
    hitSlop={hitSlop}>
    <Image
      testID="icon-image"
      source={source}
      style={[
        {
          width: size,
          height: size,
          tintColor: color,
        },
        StyleSheet.flatten(style),
      ]}
      resizeMode={resizeMode}
    />
  </TouchableOpacity>
)
