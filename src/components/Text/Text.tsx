import React from 'react'
import {StyleSheet, Text as RNText, TextProps} from 'react-native'
import {metrics} from '../../helpers/metrics'

type IBaseText = TextProps
interface IBaseTextDefaultComponent extends React.FC<IBaseText> {
  Bold: React.FC<IBaseText>
  Underline: React.FC<IBaseText>
  Span: React.FC<IBaseText>
  Title: React.FC<IBaseText>
}

const BaseText: IBaseTextDefaultComponent = ({...rest}) => <RNText {...rest} />
const TextBold: React.FC<IBaseText> = ({style, ...rest}) => (
  <BaseText {...rest} style={[StyleSheet.flatten(style), styles.textBold]} />
)
const TextUnderLine: React.FC<IBaseText> = ({style, ...rest}) => (
  <BaseText {...rest} style={[StyleSheet.flatten(style), styles.textUnderLine]} />
)
const TextTitle: React.FC<IBaseText> = ({style, ...rest}) => (
  <BaseText {...rest} style={[StyleSheet.flatten(style), styles.textTitle]} />
)
const TextSpan: React.FC<IBaseText> = ({style, ...rest}) => (
  <BaseText {...rest} style={[StyleSheet.flatten(style), styles.textSpan]} />
)

BaseText.Bold = TextBold
BaseText.Underline = TextUnderLine
BaseText.Title = TextTitle
BaseText.Span = TextSpan

const styles = StyleSheet.create({
  textBold: {
    fontWeight: 'bold',
  },
  textUnderLine: {
    textDecorationLine: 'underline',
  },
  textTitle: {
    fontSize: metrics.title,
  },
  textSpan: {
    fontSize: metrics.span,
  },
})
export default BaseText
