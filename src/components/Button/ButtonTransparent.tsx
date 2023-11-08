import React from 'react'
import {useTheme} from '../../hooks'
import type {ButtonProps} from './Button'
import Button from './Button'

const ButtonTransparent: React.FC<ButtonProps> = props => {
  const ButtonTransparentTheme = useTheme().components.ButtonTransparent
  return <Button outline {...ButtonTransparentTheme} {...props} />
}

export default ButtonTransparent
