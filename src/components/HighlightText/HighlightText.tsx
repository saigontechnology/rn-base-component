import React from 'react'
import {StyleProp, Text, TextStyle} from 'react-native'
import styled from 'styled-components/native'
import type {ITheme} from '../../theme'
import {findAll} from './utils'

type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>

export type Theme = {
  theme?: ITheme
}

export type HighlightTextProps = {
  /**
   * Text to highlight
   */
  textToHighlight: string
  /**
   * Array of search words
   */
  searchWords: Array<string>
  /**
   * custom function to process each word and text to highlight
   * default: undefined
   */
  sanitize?: (string: string) => string
  /**
   * Escape special characters
   * default: false
   */
  autoEscape?: boolean
  /**
   * Styles applied to sentence
   * default: undefined
   */
  textWrapperStyle?: CustomTextStyleProp
  /**
   * Styles applied to normal text
   * default: undefined
   */
  normalTextStyle?: CustomTextStyleProp
  /**
   * Styles applied to highlight text
   * default: undefined
   */
  highlightTextStyle?: CustomTextStyleProp
}

const HighlightText: React.FC<HighlightTextProps> = ({
  textToHighlight,
  searchWords,
  sanitize,
  autoEscape = false,
  textWrapperStyle,
  normalTextStyle,
  highlightTextStyle,
  ...props
}) => {
  const chunks = findAll({textToHighlight, searchWords, sanitize, autoEscape})
  return (
    <TextWrapper style={textWrapperStyle} testID="container" {...props}>
      {chunks.map((chunk, index) => {
        const text = textToHighlight.substring(chunk.start, chunk.end)

        return !chunk.highlight ? (
          <Text style={normalTextStyle} key={index} testID="text">
            {text}
          </Text>
        ) : (
          <Highlight testID="text" key={index} style={chunk.highlight && highlightTextStyle}>
            {text}
          </Highlight>
        )
      })}
    </TextWrapper>
  )
}

const TextWrapper = styled(Text)({})
const Highlight = styled(Text)(({theme}: Theme) => ({
  color: theme?.colors?.darkText,
  fontWeight: theme?.fontWeights?.extrabold,
  backgroundColor: theme?.colors?.white,
}))

HighlightText.displayName = 'HighlightText'
export default HighlightText
