import React from 'react'
import styled from 'styled-components/native'
import {type TouchableOpacityProps as BaseTouchableOpacityProps, StyleSheet} from 'react-native'
import type {ITheme} from '../../theme'
import {useTheme} from '../../hooks'

export type TouchableOpacityProps = {
  onPress?: () => void
  /**
   * Color of the button background
   */
  backgroundColor?: string
  /**
   * Disable interactions for the component
   */
  disabled?: boolean
  /**
   * Color of the disabled button background
   */
  disabledColor?: string
  /**
   * TouchableOpacity will have outline style
   */
  outline?: boolean
  /**
   * The outline color
   */
  outlineColor?: string
  /**
   * The outline width
   */
  outlineWidth?: number
  /**
   * Custom border radius.
   */
  borderRadius?: number
} & BaseTouchableOpacityProps

const TouchableOpacity: React.FC<TouchableOpacityProps> = ({
  onPress,
  backgroundColor,
  outline,
  outlineColor,
  outlineWidth,
  borderRadius,
  disabled,
  disabledColor,
  style,
  ...props
}) => {
  const TouchableOpacityTheme = useTheme().components.TouchableOpacity
  return (
    <TouchableOpacityWrapper
      onPress={onPress}
      activeOpacity={0.8}
      backgroundColor={
        disabled
          ? disabledColor ?? TouchableOpacityTheme.disabledColor
          : backgroundColor ?? TouchableOpacityTheme.backgroundColor
      }
      outline={outline}
      outlineColor={outlineColor}
      outlineWidth={outlineWidth}
      borderRadius={borderRadius ?? TouchableOpacityTheme.borderRadius}
      disabled={disabled}
      style={[{height: TouchableOpacityTheme.height}, StyleSheet.flatten(style)]}
      {...props}
    />
  )
}

const TouchableOpacityWrapper = styled.TouchableOpacity(
  ({
    theme,
    backgroundColor,
    outline,
    outlineWidth,
    outlineColor,
    borderRadius,
    disabled,
  }: Omit<TouchableOpacityProps, 'onPress'> & {theme?: ITheme}) => ({
    paddingVertical: theme?.spacing.small,
    flexDirection: 'row',
    paddingHorizontal: theme?.spacing.slim,
    borderRadius,
    backgroundColor: disabled ? theme?.colors.muted : backgroundColor || theme?.colors.green,
    justifyContent: 'center',
    alignSelf: 'center',
    ...(outline && {
      borderWidth: outlineWidth || 1,
      borderColor: disabled ? theme?.colors.gray : outlineColor || theme?.colors.primaryBorder,
    }),
  }),
)

export default TouchableOpacity
