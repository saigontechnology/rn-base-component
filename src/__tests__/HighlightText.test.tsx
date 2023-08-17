import {render} from '@testing-library/react-native'
import React from 'react'
import {StyleSheet} from 'react-native'
import type {ReactTestInstance} from 'react-test-renderer'
import HighlightText from '../components/HighlightText/HighlightText'

describe('HighlightText', () => {
  const textToHighlight = 'Lorem ipsum dolor sit amet consectetur adipiscing elit'
  const searchWords = ['ipsum', 'adipiscing']
  it('should render correctly', () => {
    const {getByTestId} = render(
      <HighlightText textToHighlight={textToHighlight} searchWords={searchWords} />,
    )
    expect(getByTestId('container')).toBeDefined()
  })

  it('renders highlighted and non-highlighted text correctly', () => {
    const {getByTestId, getAllByTestId} = render(
      <HighlightText textToHighlight={textToHighlight} searchWords={searchWords} />,
    )

    const container = getByTestId('container')
    expect(container).toBeTruthy()
    const renderedTexts = getAllByTestId('text')
    expect(renderedTexts).toHaveLength(5)

    const firstText = container.children[0] as ReactTestInstance
    const highlightedText = container.children[1] as ReactTestInstance
    const lastText = container.children[2] as ReactTestInstance

    expect(firstText?.props.children).toBe('Lorem ')
    expect(highlightedText?.props.children).toBe('ipsum')
    expect(lastText?.props?.children).toBe(' dolor sit amet consectetur ')
  })

  it('applies custom styles correctly', () => {
    const highlightTextStyle = {backgroundColor: 'yellow'}
    const normalTextStyle = {backgroundColor: 'red'}

    const {getAllByTestId} = render(
      <HighlightText
        textToHighlight={textToHighlight}
        searchWords={searchWords}
        highlightTextStyle={highlightTextStyle}
        normalTextStyle={normalTextStyle}
      />,
    )

    const renderedTexts = getAllByTestId('text')

    const firstText = renderedTexts[0] as ReactTestInstance
    const highlightedText = renderedTexts[1] as ReactTestInstance
    const lastText = renderedTexts[2] as ReactTestInstance

    expect(StyleSheet.flatten(firstText.props.style)).toEqual(normalTextStyle)
    expect(StyleSheet.flatten(highlightedText.props.style)).toEqual(highlightTextStyle)
    expect(StyleSheet.flatten(lastText.props.style)).toEqual(normalTextStyle)
  })
})
