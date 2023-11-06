import type {TextProps as TextProperties, TextStyle} from 'react-native'
import {metrics} from '../../helpers/metrics'
import styled from 'styled-components/native'
import type {Theme} from 'src/theme'

export type TextProps = {
  fontSize?: TextStyle['fontSize']
  color?: string
  fontWeight?: TextStyle['fontWeight']
  theme: Theme
} & TextProperties

export const Text = styled.Text((props: TextProps) => ({
  fontSize: props?.fontSize || metrics.span,
  color: props?.color || props?.theme?.colors?.black,
  fontFamily: props?.theme?.fonts?.regular,
}))

export const TextBold = styled(Text)((props: TextProps) => ({
  fontFamily: props?.theme?.fonts?.bold,
}))

export const TextItalic = styled(Text)<TextProps>(() => ({
  fontStyle: 'italic',
}))
