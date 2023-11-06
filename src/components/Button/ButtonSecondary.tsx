import React from 'react'
import {useTheme} from '../../hooks'
import type {ButtonProps} from './Button'
import Button from './Button'

const ButtonSecondary: React.FC<ButtonProps> = ({textColor, backgroundColor, disabled, ...props}) => {
  const ButtonSecondaryTheme = useTheme().components.ButtonSecondary
  return (
    <Button
      backgroundColor={
        disabled
          ? ButtonSecondaryTheme.disabledColor
          : backgroundColor ?? ButtonSecondaryTheme.backgroundColor
      }
      textColor={textColor ?? ButtonSecondaryTheme.labelColor}
      {...props}
    />
  )
}

export default ButtonSecondary
