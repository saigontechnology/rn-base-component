import React from 'react'
import {useTheme} from '../../hooks'
import type {ButtonProps} from './Button'
import Button from './Button'

const ButtonTransparent: React.FC<ButtonProps> = ({textColor, backgroundColor, disabled, ...props}) => {
  const ButtonTransparentTheme = useTheme().components.ButtonTransparent
  return (
    <Button
      backgroundColor={
        disabled
          ? ButtonTransparentTheme.disabledColor
          : backgroundColor ?? ButtonTransparentTheme.backgroundColor
      }
      textColor={textColor ?? ButtonTransparentTheme.labelColor}
      {...props}
    />
  )
}

export default ButtonTransparent
