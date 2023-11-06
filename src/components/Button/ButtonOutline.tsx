import React from 'react'
import {useTheme} from '../../hooks'
import type {ButtonProps} from './Button'
import Button from './Button'

const ButtonOutline: React.FC<ButtonProps> = ({
  textColor,
  backgroundColor,
  outlineColor,
  outlineWidth,
  disabled,
  ...props
}) => {
  const ButtonOutlineTheme = useTheme().components.ButtonOutline
  return (
    <Button
      outline
      outlineWidth={outlineWidth ?? ButtonOutlineTheme.outlineWidth}
      outlineColor={outlineColor ?? ButtonOutlineTheme.outlineColor}
      backgroundColor={
        disabled ? ButtonOutlineTheme.disabledColor : backgroundColor ?? ButtonOutlineTheme.backgroundColor
      }
      textColor={textColor ?? ButtonOutlineTheme.labelColor}
      {...props}
    />
  )
}

export default ButtonOutline
