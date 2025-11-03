import React, {PropsWithChildren, useCallback, useMemo} from 'react'
import {LayoutAnimation, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import type {CommonAccordionProps, Section} from './Accordion'
import {toggleAnimation} from './ToggleAnimation'
import {useTheme} from '../../hooks'

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

export const AccordionItem: React.FC<AccordionItemProps> = ({
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
  const theme = useTheme()
  const AccordionTheme = theme.components.Accordion

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
    LayoutAnimation.configureNext(
      toggleAnimation(
        openAnimation,
        closeAnimation,
        openDuration ?? AccordionTheme.animation.openDuration,
        closeDuration ?? AccordionTheme.animation.closeDuration,
      ),
    )
    onPress(keyExtractorItem)
  }, [
    closeAnimation,
    closeDuration,
    keyExtractorItem,
    onPress,
    openAnimation,
    openDuration,
    AccordionTheme.animation.openDuration,
    AccordionTheme.animation.closeDuration,
  ])

  return (
    <AccordionContainer key={keyExtractorItem} style={itemContainerStyle}>
      <TouchableOpacity
        testID="accordion-item"
        activeOpacity={AccordionTheme.interactive.activeOpacity}
        onPress={onPressItem}>
        {header}
      </TouchableOpacity>
      {content}
    </AccordionContainer>
  )
}

const AccordionContainer = styled.View(({theme}) => ({
  paddingBottom: theme?.components?.Accordion?.container?.paddingBottom ?? theme?.spacing?.petite,
  overflow: theme?.components?.Accordion?.container?.overflow ?? 'hidden',
}))

const AccordionHeader = styled.View(({theme}) => ({
  padding: theme?.components?.Accordion?.header?.padding ?? theme?.spacing?.compact,
}))

const Title = styled.Text(({theme}) => ({
  fontSize: theme?.components?.Accordion?.title?.fontSize ?? theme?.fontSizes?.xl,
  textAlign: theme?.components?.Accordion?.title?.textAlign ?? 'center',
  color: theme?.components?.Accordion?.title?.color ?? theme?.colors?.amber,
  fontWeight:
    theme?.fontWeights?.[theme?.components?.Accordion?.title?.fontWeight ?? 'bold'] ??
    theme?.fontWeights?.bold,
}))

const AccordionBody = styled.View(({theme}) => ({
  padding: theme?.components?.Accordion?.body?.padding ?? theme?.spacing?.compact,
  justifyContent: theme?.components?.Accordion?.body?.justifyContent ?? 'center',
  alignItems: theme?.components?.Accordion?.body?.alignItems ?? 'center',
}))
