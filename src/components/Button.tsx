import React from 'react'
import styled from 'styled-components/native'
import {metrics} from '../helpers/metrics'
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native'

export type ButtonProps = {
  onPress?: () => void
  text: string
  color?: string
  textColor?: string
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button: React.FC<ButtonProps> = ({text, onPress, color, textColor, style, textStyle}) => (
  <ButtonWrapper onPress={onPress} activeOpacity={0.8} color={color} style={style}>
    <Label color={textColor} style={textStyle}>
      {text}
    </Label>
  </ButtonWrapper>
)

const ButtonWrapper = styled(TouchableOpacity)<{color?: string}>(({theme, color}) => ({
  paddingVertical: metrics.xxs,
  paddingHorizontal: metrics.small,
  borderRadius: metrics.borderRadius,
  backgroundColor: color || theme.colors.green,
  alignSelf: 'flex-start',
}))

const Label = styled(Text)<{color?: string}>(({theme, color}) => ({
  color: color || 'white',
  fontWeight: theme?.fontWeights?.bold,
}))

export default Button
