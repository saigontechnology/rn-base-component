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
  <ButtonWrapper onPress={onPress} activeOpacity={0.8} color={color}>
    <Label color={textColor}>{text}</Label>
  </ButtonWrapper>
)

// interface IButtonWrapper {
//   color?: string
// }
const ButtonWrapper = styled.TouchableOpacity(({theme, color}: any) => ({
  paddingVertical: metrics.xxs,
  paddingHorizontal: metrics.small,
  borderRadius: metrics.borderRadius,
  backgroundColor: color || theme.colors.green,
  alignSelf: 'flex-start',
}))

// interface ILabel {
//   color?: string
// }
const Label = styled.Text(({theme, color}: any) => ({
  color: color || 'white',
  fontWeight: theme?.fontWeights?.bold,
}))

export default Button
