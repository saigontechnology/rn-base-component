import React from 'react'
import {useTheme} from '../../hooks'
import type {ButtonProps} from './Button'
import Button from './Button'

const ButtonPrimary: React.FC<ButtonProps> = ({textColor, backgroundColor, disabled, ...props}) => {
  const ButtonPrimaryTheme = useTheme().components.ButtonPrimary
  return (
    <Button
      backgroundColor={
        disabled ? ButtonPrimaryTheme.disabledColor : backgroundColor ?? ButtonPrimaryTheme.backgroundColor
      }
      textColor={textColor ?? ButtonPrimaryTheme.labelColor}
      {...props}
    />
  )
}

export default ButtonPrimary
