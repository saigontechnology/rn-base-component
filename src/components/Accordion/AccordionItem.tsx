import React, {useCallback} from 'react'
import {LayoutAnimation, View, TouchableOpacity, Text} from 'react-native'
import {toggleAnimation} from './ToggleAnimation'
import styled from 'styled-components/native'
import type {ITheme} from '../../theme'
import type {Section, CommonAccordionProps} from './Accordion'

export type Theme = {
  theme?: ITheme
}

export interface AccordionItemProps extends CommonAccordionProps {
  /**
   * content of accordion
   */
  children?: React.ReactElement
  /**
   * onPress item event
   */
  onPress: (keyExtractorItem: string) => void
  /**
   * keyExtractor for item
   */
  keyExtractorItem: string
  expanded?: boolean
  index: number
  item: Section
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  title = '',
  onPress,
  keyExtractorItem,
  expanded = false,
  index,
  itemContainerStyle,
  headerContainerStyle,
  contentContainerStyle,
  titleStyle,
  item,
  openAnimation,
  closeAnimation,
  openDuration,
  closeDuration,
  renderHeader = () => null,
  renderSectionTitle,
  renderContent,
}) => {
  const content = expanded ? (
    renderContent ? (
      renderContent(item, index, expanded, keyExtractorItem)
    ) : (
      <AccordionBody style={contentContainerStyle}>{children}</AccordionBody>
    )
  ) : null

  const header = renderHeader(item, index, expanded, keyExtractorItem) || (
    <AccordionHeader style={headerContainerStyle}>
      {renderSectionTitle ? (
        renderSectionTitle(item, index, expanded)
      ) : (
        <Title style={titleStyle}>{title}</Title>
      )}
    </AccordionHeader>
  )

  const onPressItem = useCallback(() => {
    LayoutAnimation.configureNext(toggleAnimation(openAnimation, closeAnimation, openDuration, closeDuration))
    onPress(keyExtractorItem)
  }, [closeAnimation, closeDuration, keyExtractorItem, onPress, openAnimation, openDuration])

  return (
    <AccordionContainer key={keyExtractorItem} style={itemContainerStyle}>
      <TouchableOpacity testID="accordion-item" activeOpacity={0.7} onPress={onPressItem}>
        {header}
      </TouchableOpacity>
      {content}
    </AccordionContainer>
  )
}

export default React.memo(AccordionItem)

const AccordionContainer = styled(View)(({theme}: Theme) => ({
  paddingBottom: theme?.spacing?.petite,
  overflow: 'hidden',
}))

const AccordionHeader = styled(View)(({theme}: Theme) => ({
  padding: theme?.spacing?.compact,
}))

const Title = styled(Text)<Theme>(({theme}) => ({
  fontSize: theme?.fontSizes?.xl,
  textAlign: 'center',
  color: theme?.colors?.amber,
  fontWeight: theme?.fontWeights?.bold,
}))

const AccordionBody = styled(View)(({theme}: Theme) => ({
  padding: theme?.spacing?.compact,
  justifyContent: 'center',
  alignItems: 'center',
}))
