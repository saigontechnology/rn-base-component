import React from 'react'
import styled from 'styled-components/native'
import {type TextProps as RNTextProps, type TextStyle, Text as RNText, type StyleProp} from 'react-native'
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
   * Font weight
   */
  fontWeight?: TextStyle['fontWeight']
  /**
   * Custom font family
   */
  fontFamily?: string
  /**
   * Custom text style
   */
  textStyle?: StyleProp<TextStyle>
}

const StyledText = styled(RNText)<TextProps>(({theme, fontSize, color, fontWeight, fontFamily}) => ({
  fontSize,
  color,
  fontWeight: fontWeight ?? 'normal',
  fontFamily: fontFamily ?? theme.fonts.regular,
}))

const StyledTextItalic = styled(StyledText)`
  font-style: italic;
`

export const Text: React.FC<TextProps> = ({
  fontSize,
  color,
  fontWeight,
  fontFamily,
  textStyle,
  children,
  ...props
}) => {
  const TextTheme = useTheme().components.Text

  return (
    <StyledText
      fontSize={fontSize ?? TextTheme.fontSize}
      color={color ?? TextTheme.color}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      style={textStyle}
      {...props}>
      {children}
    </StyledText>
  )
}

export const TextBold: React.FC<TextProps> = ({textStyle, children, ...props}) => (
  <StyledText {...props} style={textStyle}>
    {children}
  </StyledText>
)

export const TextItalic: React.FC<TextProps> = ({textStyle, children, ...props}) => (
  <StyledTextItalic {...props} style={textStyle}>
    {children}
  </StyledTextItalic>
)
