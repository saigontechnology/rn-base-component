import React from 'react'
import styled from 'styled-components/native'
import {Text as RNText, type TextProps as RNTextProps, type TextStyle} from 'react-native'
import {useTheme} from '../../hooks'

export type TextProps = RNTextProps & {
  /**
   * Custom font size
   */
  fontSize?: TextStyle['fontSize']
  /**
   * Text color
   */
  color?: string
  /**
   * Custom font family
   */
  fontFamily?: string
}

export const Text: React.FC<TextProps> = styled(RNText)<TextProps>(
  ({theme, fontSize, color, fontFamily}) => ({
    fontSize: fontSize ?? theme.components.Text.fontSize,
    color: color ?? theme.components.Text.color,
    fontFamily: fontFamily ?? theme.fonts.regular,
  }),
)

export const TextBold: React.FC<TextProps> = props => <Text {...props} fontFamily={useTheme().fonts.bold} />

export const TextItalic: React.FC<TextProps> = props => (
  // eslint-disable-next-line react-native/no-inline-styles
  <Text {...props} style={[props.style, {fontStyle: 'italic'}]} />
)
