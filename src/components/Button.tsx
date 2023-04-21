import React from 'react'
import styled from 'styled-components/native'
import {metrics} from '../helpers/metrics'

export type ButtonProps = {
  onPress: () => void
  text: string
  color?: string
  textColor?: string
}

const Button: React.FC<ButtonProps> = ({text, onPress, color, textColor}) => (
  <ButtonRoot onPress={onPress} activeOpacity={0.8} color={color}>
    <Label color={textColor}>{text}</Label>
  </ButtonRoot>
)

interface IButtonRoot {
  color?: string
}
const ButtonRoot = styled.TouchableOpacity<IButtonRoot>(({theme, color}) => ({
  paddingVertical: metrics.xxs,
  paddingHorizontal: metrics.small,
  borderRadius: metrics.borderRadius,
  backgroundColor: color || theme.colors?.cardPrimaryBackground,
  alignSelf: 'flex-start',
}))

interface ILabel {
  color?: string
}
const Label = styled.Text<ILabel>(({theme, color}) => ({
  color: color || 'white',
  fontWeight: theme?.fontWeights?.bold,
}))

export default Button
