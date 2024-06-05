import React from 'react'
import {useTheme} from '../../hooks'
import type {ButtonProps} from './Button'
import {Button} from './Button'

export const ButtonSecondary: React.FC<ButtonProps> = props => {
  const ButtonSecondaryTheme = useTheme().components.ButtonSecondary
  return <Button {...ButtonSecondaryTheme} {...props} />
}
