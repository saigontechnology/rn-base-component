import React from 'react'
import styled from 'styled-components/native'
import {metrics} from '../../helpers'
import type {TouchableOpacityProps, TextProps, StyleProp} from 'react-native'
import type {ITheme} from 'src/theme'

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
   * Custom text props.
   */
  textProps?: TextProps
  /**
   * Custom text style.
   */
  textStyle?: StyleProp<TextProps>
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
  textProps,
  textStyle,
  ...props
}) => (
  <ButtonWrapper
    onPress={onPress}
    activeOpacity={0.8}
    backgroundColor={backgroundColor}
    outline={outline}
    outlineColor={outlineColor}
    outlineWidth={outlineWidth}
    borderRadius={borderRadius}
    disabled={disabled}
    {...props}>
    <Label {...textProps} style={textStyle} color={textColor}>
      {text}
    </Label>
  </ButtonWrapper>
)

const ButtonWrapper = styled.TouchableOpacity(
  ({
    theme,
    backgroundColor,
    outline,
    outlineWidth,
    outlineColor,
    borderRadius,
    disabled,
  }: Omit<ButtonProps, 'text' | 'onPress'> & {theme?: ITheme}) => ({
    paddingVertical: theme?.spacing.small,
    paddingHorizontal: theme?.spacing.slim,
    borderRadius: borderRadius || metrics.borderRadius,
    backgroundColor: disabled ? theme?.colors.muted : backgroundColor || theme?.colors.green,
    alignSelf: 'center',
    ...(outline && {
      borderWidth: outlineWidth || 1,
      borderColor: disabled ? theme?.colors.gray : outlineColor || theme?.colors.primaryBorder,
    }),
  }),
)

const Label = styled.Text(({theme, color}: {color?: string; theme?: ITheme}) => ({
  color: color || 'white',
  fontWeight: theme?.fontWeights?.bold,
}))

export default Button
