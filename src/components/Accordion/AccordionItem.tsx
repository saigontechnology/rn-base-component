import React, {PropsWithChildren, useCallback, useMemo} from 'react'
import {LayoutAnimation, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import type {ITheme} from '../../theme'
import type {CommonAccordionProps, Section} from './Accordion'
import {toggleAnimation} from './ToggleAnimation'

export type Theme = {
  theme?: ITheme
}

export interface AccordionItemProps extends PropsWithChildren<CommonAccordionProps> {
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
  children,
}) => {
  const content = useMemo(() => {
    if (expanded) {
      return renderContent ? (
        renderContent(item, index, expanded, keyExtractorItem)
      ) : (
        <AccordionBody style={contentContainerStyle}>{children}</AccordionBody>
      )
    }
    return null
  }, [renderContent, expanded, keyExtractorItem, index, item, children, contentContainerStyle])

  const header = useMemo(
    () =>
      renderHeader(item, index, expanded, keyExtractorItem) || (
        <AccordionHeader style={headerContainerStyle}>
          {renderSectionTitle ? (
            renderSectionTitle(item, index, expanded)
          ) : (
            <Title style={titleStyle}>{title}</Title>
          )}
        </AccordionHeader>
      ),
    [
      renderHeader,
      item,
      index,
      expanded,
      keyExtractorItem,
      renderSectionTitle,
      headerContainerStyle,
      title,
      titleStyle,
    ],
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

const AccordionContainer = styled.View(({theme}: Theme) => ({
  paddingBottom: theme?.spacing?.petite,
  overflow: 'hidden',
}))

const AccordionHeader = styled.View(({theme}: Theme) => ({
  padding: theme?.spacing?.compact,
}))

const Title = styled.Text(({theme}: Theme) => ({
  fontSize: theme?.fontSizes?.xl,
  textAlign: 'center',
  color: theme?.colors?.amber,
  fontWeight: theme?.fontWeights?.bold,
}))

const AccordionBody = styled.View(({theme}: Theme) => ({
  padding: theme?.spacing?.compact,
  justifyContent: 'center',
  alignItems: 'center',
}))
