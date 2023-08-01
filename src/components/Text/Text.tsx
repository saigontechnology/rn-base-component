import React from 'react'
import {StyleSheet, Text as RNText, TextProps} from 'react-native'
import {metrics} from '../../helpers/metrics'
import styled from 'styled-components/native'

type IBaseText = TextProps
interface IBaseTextDefaultComponent extends React.FC<IBaseText> {
  Bold: React.FC<IBaseText>
  Underline: React.FC<IBaseText>
  Span: React.FC<IBaseText>
  Title: React.FC<IBaseText>
}

const BaseText: IBaseTextDefaultComponent = ({...rest}) => <RNText {...rest} />
const TextBold: React.FC<IBaseText> = ({style, ...rest}) => (
  <TxtBold {...rest} style={StyleSheet.flatten(style)} />
)
const TextUnderLine: React.FC<IBaseText> = ({style, ...rest}) => (
  <TxtUnderLine {...rest} style={StyleSheet.flatten(style)} />
)
const TextTitle: React.FC<IBaseText> = ({style, ...rest}) => (
  <TxtTitle {...rest} style={StyleSheet.flatten(style)} />
)
const TextSpan: React.FC<IBaseText> = ({style, ...rest}) => (
  <TxtSpan {...rest} style={StyleSheet.flatten(style)} />
)

BaseText.Bold = TextBold
BaseText.Underline = TextUnderLine
BaseText.Title = TextTitle
BaseText.Span = TextSpan

const TxtBold = styled(BaseText)({
  fontWeight: 'bold',
})

const TxtUnderLine = styled(BaseText)({
  textDecorationLine: 'underline',
})

const TxtTitle = styled(BaseText)({
  fontSize: metrics.title,
})

const TxtSpan = styled(BaseText)({
  fontSize: metrics.span,
})

export default BaseText
