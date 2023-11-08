import React from 'react'
import {useTheme} from '../../hooks'
import type {ButtonProps} from './Button'
import Button from './Button'

const ButtonPrimary: React.FC<ButtonProps> = props => {
  const ButtonPrimaryTheme = useTheme().components.ButtonPrimary
  return <Button {...ButtonPrimaryTheme} {...props} />
}

export default ButtonPrimary
