import React from 'react'
import {useTheme} from '../../hooks'
import type {ButtonProps} from './Button'
import {Button} from './Button'

export const ButtonOutline: React.FC<ButtonProps> = props => {
  const ButtonOutlineTheme = useTheme().components.ButtonOutline
  return <Button outline {...ButtonOutlineTheme} {...props} />
}
