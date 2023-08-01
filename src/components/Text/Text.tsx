import React from 'react'
import {StyleSheet, Text as RNText, TextProps} from 'react-native'
import {metrics} from '../../helpers/metrics'
import styled from 'styled-components/native'

interface TextComponent extends React.FC<TextProps> {
  Bold: React.FC<TextProps>
  Underline: React.FC<TextProps>
  Span: React.FC<TextProps>
  Title: React.FC<TextProps>
}

const Text: TextComponent = ({...rest}) => <RNText {...rest} />
const TextBold: React.FC<TextProps> = ({style, ...rest}) => (
  <TxtBold {...rest} style={StyleSheet.flatten(style)} />
)
const TextUnderLine: React.FC<TextProps> = ({style, ...rest}) => (
  <TxtUnderLine {...rest} style={StyleSheet.flatten(style)} />
)
const TextTitle: React.FC<TextProps> = ({style, ...rest}) => (
  <TxtTitle {...rest} style={StyleSheet.flatten(style)} />
)
const TextSpan: React.FC<TextProps> = ({style, ...rest}) => (
  <TxtSpan {...rest} style={StyleSheet.flatten(style)} />
)

Text.Bold = TextBold
Text.Underline = TextUnderLine
Text.Title = TextTitle
Text.Span = TextSpan

const TxtBold = styled(Text)({
  fontWeight: 'bold',
})

const TxtUnderLine = styled(Text)({
  textDecorationLine: 'underline',
})

const TxtTitle = styled(Text)({
  fontSize: metrics.title,
})

const TxtSpan = styled(Text)({
  fontSize: metrics.span,
})

export default Text
