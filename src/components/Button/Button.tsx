import React, {ReactNode} from 'react'
import styled from 'styled-components/native'
import {
  type TouchableOpacityProps,
  type TextProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  StyleSheet,
} from 'react-native'
import type {ITheme} from '../../theme'
import {useTheme} from '../../hooks'

export type ButtonProps = {
  onPress: () => void
  text: string
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
  style?: StyleProp<ViewStyle>
} & TouchableOpacityProps

const Button: React.FC<ButtonProps> = ({
  onPress,
  text,
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
      <Label {...textProps} style={textStyle} color={textColor ?? ButtonTheme.textColor}>
        {text}
      </Label>
      {!!rightIcon && rightIcon}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.TouchableOpacity(
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
  }: Omit<ButtonProps, 'text' | 'onPress'> & {theme?: ITheme}) => ({
    paddingVertical: theme?.spacing.small,
    paddingHorizontal: theme?.spacing.slim,
    borderRadius,
    backgroundColor: disabled ? theme?.colors.muted : backgroundColor || theme?.colors.green,
    ...((leftIcon || rightIcon) && {
      alignItems: 'center',
      fexDirection: 'row',
    }),
    alignSelf: 'center',
    ...(outline && {
      borderWidth: outlineWidth || 1,
      borderColor: disabled ? theme?.colors.gray : outlineColor || theme?.colors.primaryBorder,
    }),
  }),
)

const Label = styled.Text(({theme, color}: {color?: string; theme?: ITheme}) => ({
  color,
  fontWeight: theme?.fontWeights?.bold,
}))

export default Button
