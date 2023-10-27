import type {TextProps as TextProperties, TextStyle} from 'react-native'
import {metrics} from '../../helpers/metrics'
import styled from 'styled-components/native'

type TextProps = {
  fontSize?: TextStyle['fontSize']
  color?: string
  fontWeight?: TextStyle['fontWeight']
} & TextProperties

export const Text = styled.Text<TextProps>(props => ({
  fontSize: props?.fontSize || metrics.span,
  color: props?.color || props?.theme?.colors?.black,
  fontFamily: props?.theme?.fonts?.regular,
}))

export const TextBold = styled(Text)<TextProps>(props => ({
  fontFamily: props?.theme?.fonts?.bold,
}))

export const TextItalic = styled(Text)<TextProps>(() => ({
  fontStyle: 'italic',
}))
