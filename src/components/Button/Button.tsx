import React, {ReactNode} from 'react'
import styled from 'styled-components/native'
import {
  GestureResponderEvent,
  type StyleProp,
  StyleSheet,
  type TextProps,
  type TextStyle,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native'
import {useTheme} from '../../hooks'
import {Text} from '../Text/Text'

export type ButtonProps = {
  /**
   * Called when the touch is released, but not if cancelled
   */
  onPress?: (e?: GestureResponderEvent) => void | undefined
  /**
   * Color of the label
   */
  textColor?: string
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
   * Button will have outline style
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
  /**
   * Custom left/right icon
   */
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  /**
   * Custom text props.
   */
  textProps?: TextProps
  /**
   * Custom text style.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Custom container style.
   */
  style?: StyleProp<ViewStyle>
} & TouchableOpacityProps

const Button: React.FC<ButtonProps> = ({
  onPress,
  textColor,
  backgroundColor,
  outline,
  outlineColor,
  outlineWidth,
  borderRadius,
  disabled,
  disabledColor,
  textProps,
  textStyle,
  style,
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  const ButtonTheme = useTheme().components.Button
  return (
    <ButtonWrapper
      onPress={onPress}
      activeOpacity={0.8}
      backgroundColor={
        disabled ? disabledColor ?? ButtonTheme.disabledColor : backgroundColor ?? ButtonTheme.backgroundColor
      }
      outline={outline}
      outlineColor={outlineColor}
      outlineWidth={outlineWidth}
      borderRadius={borderRadius ?? ButtonTheme.borderRadius}
      disabled={disabled}
      style={[{height: ButtonTheme.height}, StyleSheet.flatten(style)]}
      {...props}>
      {!!leftIcon && leftIcon}
      {typeof children === 'string' ? (
        <Label {...textProps} style={textStyle} color={textColor ?? ButtonTheme.textColor}>
          {children}
        </Label>
      ) : (
        children
      )}
      {!!rightIcon && rightIcon}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.TouchableOpacity<Omit<ButtonProps, 'text' | 'onPress'>>(
  ({
    theme,
    backgroundColor,
    outline,
    outlineWidth,
    outlineColor,
    borderRadius,
    disabled,
    leftIcon,
    rightIcon,
  }) => ({
    paddingVertical: theme?.spacing.small,
    flexDirection: 'row',
    paddingHorizontal: theme?.spacing.slim,
    borderRadius,
    backgroundColor: disabled ? theme?.colors.muted : backgroundColor || theme?.colors.green,
    justifyContent: 'center',
    ...((leftIcon || rightIcon) && {
      alignItems: 'center',
    }),
    alignSelf: 'center',
    ...(outline && {
      borderWidth: outlineWidth || 1,
      borderColor: disabled ? theme?.colors.gray : outlineColor || theme?.colors.primaryBorder,
    }),
  }),
)

const Label = styled(Text)(({theme, color}) => ({
  color,
  fontWeight: theme?.fontWeights?.bold,
}))

export default Button
