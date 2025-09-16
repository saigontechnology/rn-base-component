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
import {hitSlop as defaultHitSlop} from '../../helpers/metrics'
import {useTheme} from '../../hooks'

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
  size,
  disabled,
  color,
  hitSlop = defaultHitSlop,
  style,
  resizeMode,
  testID,
  onPress,
  onLongPress,
  buttonStyle,
}) => {
  const IconTheme = useTheme().components.Icon

  return (
    <TouchableOpacity
      testID={testID}
      disabled={(!onPress && !onLongPress) || (disabled ?? IconTheme.disabled)}
      onPress={onPress}
      onLongPress={onLongPress}
      style={buttonStyle ?? IconTheme.buttonStyle}
      hitSlop={hitSlop}>
      <Image
        testID="icon-image"
        source={source}
        style={[
          {
            width: size ?? IconTheme.size,
            height: size ?? IconTheme.size,
            tintColor: color ?? IconTheme.color,
          },
          StyleSheet.flatten(style ?? IconTheme.style),
        ]}
        resizeMode={resizeMode ?? IconTheme.resizeMode}
      />
    </TouchableOpacity>
  )
}
