import React from 'react'
import styled from 'styled-components/native'
import {metrics} from '../../helpers/metrics'

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
}

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
}) => (
  <ButtonWrapper
    onPress={onPress}
    activeOpacity={0.8}
    backgroundColor={backgroundColor}
    outline={outline}
    outlineColor={outlineColor}
    outlineWidth={outlineWidth}
    borderRadius={borderRadius}
    disabled={disabled}>
    <Label color={textColor}>{text}</Label>
  </ButtonWrapper>
)

const ButtonWrapper = styled.TouchableOpacity<Omit<ButtonProps, 'text' | 'onPress'>>(
  ({theme, backgroundColor, outline, outlineWidth, outlineColor, borderRadius, disabled}) => ({
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.slim,
    borderRadius: borderRadius || metrics.borderRadius,
    backgroundColor: disabled ? theme.colors.muted : backgroundColor || theme.colors.green,
    alignSelf: 'center',
    ...(outline && {
      borderWidth: outlineWidth || 1,
      borderColor: disabled ? theme.colors.gray : outlineColor || theme.colors.primaryBorder,
    }),
  }),
)

const Label = styled.Text<{color?: string}>(({theme, color}) => ({
  color: color || 'white',
  fontWeight: theme?.fontWeights?.bold,
}))

export default Button
