import React, {useCallback, useMemo, useState} from 'react'
import {FlatList, StyleProp, Text, TextStyle, ViewStyle} from 'react-native'
import AccordionItem from './AccordionItem'
import type {AnimationType} from './ToggleAnimation'

type ViewStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type TextTitleStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>

export type Section = {
  [key: string]: string | number
  title: string
  content: string
}

export interface CommonAccordionProps {
  /**
   * onPress accordion event
   */
  onPress?: (keyExtractorItem: string) => void
  /**
   * render custom accordion header
   */
  renderHeader?: (
    item: Section,
    index: number,
    expanded: boolean,
    keyExtractorItem: string,
  ) => React.ReactNode
  /**
   * render custom title section
   */
  renderSectionTitle?: (item: Section, index: number, expanded: boolean) => React.ReactNode
  /**
   * render custom content
   */
  renderContent?: (
    item: Section,
    index: number,
    expanded: boolean,
    keyExtractorItem: string,
  ) => React.ReactNode
  /**
   * accordion title
   */
  title?: string
  /**
   * accordion container style
   */
  itemContainerStyle?: ViewStyleProp
  /**
   * accordion title style
   */
  titleStyle?: TextTitleStyleProp
  /**
   * accordion header style
   */
  headerContainerStyle?: ViewStyleProp
  /**
   * accordion body style
   */
  contentContainerStyle?: ViewStyleProp
  /**
   * animation type when open
   * default: easeInEaseOut
   */
  openAnimation?: AnimationType
  /**
   * animation type when close
   * default: easeInEaseOut
   */
  closeAnimation?: AnimationType
  /**
   * duration when open
   * default: 300
   */
  openDuration?: number
  /**
   * duration when close
   * default: 300
   */
  closeDuration?: number
}

export interface AccordionProps extends CommonAccordionProps {
  /**
   * section data sets
   */
  sections: Section[]
  /**
   * keyExtractor for Flatlist
   */
  keyExtractor?: (item: Section, index: number) => string
  /**
   * enable expand multiple item
   * default: false
   */
  expandMultiple?: boolean
  /**
   * accordion wrapper style
   */
  wrapperStyle?: ViewStyleProp
}

const Accordion = React.forwardRef<FlatList, AccordionProps>(
  ({sections, expandMultiple = false, keyExtractor, wrapperStyle, ...rest}, ref) => {
    const [array, setArray] = useState<string[]>([])

    const _keyExtractor = useMemo(
      () => keyExtractor || ((_: Section, index: number) => index.toString()),
      [keyExtractor],
    )

    const onPress = useCallback(
      (key: string) => {
        setArray(previousArray => {
          const index = previousArray.indexOf(key)
          let newArray = [...previousArray]
          if (expandMultiple) {
            if (index >= 0) {
              newArray.splice(index, 1)
            } else {
              newArray.push(key)
            }
          } else {
            newArray = index >= 0 ? [] : [key]
          }
          return newArray
        })
      },
      [expandMultiple],
    )

    const renderItem = useCallback(
      ({item, index}: {item: Section; index: number}) => (
        <AccordionItem
          key={_keyExtractor(item, index)}
          title={item?.title}
          expanded={array.includes(_keyExtractor(item, index))}
          {...rest}
          item={item}
          keyExtractorItem={_keyExtractor(item, index)}
          onPress={onPress}
          index={index}>
          <Text>{item?.content ?? ''}</Text>
        </AccordionItem>
      ),
      [_keyExtractor, onPress, array, rest],
    )

    return (
      <FlatList
        style={wrapperStyle}
        data={sections}
        ref={ref}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        extraData={array}
        {...rest}
      />
    )
  },
)

Accordion.displayName = 'Accordion'

export default React.memo(Accordion)
