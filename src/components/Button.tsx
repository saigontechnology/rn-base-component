import React from 'react'
import styled from 'styled-components/native'
import {metrics} from '../helpers/metrics'
import type {ITheme} from '../theme'

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

const ButtonRoot = styled.TouchableOpacity`
  ${(props: {theme: ITheme; color: string | undefined}) => ({
    paddingVertical: metrics.xxs,
    paddingHorizontal: metrics.small,
    borderRadius: metrics.borderRadius,
    backgroundColor: props?.color || props?.theme?.colors?.cardPrimaryBackground,
    alignSelf: 'flex-start',
  })}
`

const Label = styled.Text`
  ${(props: {theme: ITheme; color: string | undefined}) => ({
    color: props?.color || 'white',
    fontWeight: props?.theme?.fontWeights?.bold,
  })}
`

export default Button
