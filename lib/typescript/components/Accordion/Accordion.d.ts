import React from 'react';
import { FlatList, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { AnimationType } from './ToggleAnimation';
type ViewStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
type TextTitleStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;
export type Section = {
    [key: string]: string | number;
    title: string;
    content: string;
};
export interface CommonAccordionProps {
    /**
     * onPress accordion event
     */
    onPress?: (keyExtractorItem: string) => void;
    /**
     * render custom accordion header
     */
    renderHeader?: (item: Section, index: number, expanded: boolean, keyExtractorItem: string) => React.ReactNode;
    /**
     * render custom title section
     */
    renderSectionTitle?: (item: Section, index: number, expanded: boolean) => React.ReactNode;
    /**
     * render custom content
     */
    renderContent?: (item: Section, index: number, expanded: boolean, keyExtractorItem: string) => React.ReactNode;
    /**
     * accordion title
     */
    title?: string;
    /**
     * accordion container style
     */
    itemContainerStyle?: ViewStyleProp;
    /**
     * accordion title style
     */
    titleStyle?: TextTitleStyleProp;
    /**
     * accordion header style
     */
    headerContainerStyle?: ViewStyleProp;
    /**
     * accordion body style
     */
    contentContainerStyle?: ViewStyleProp;
    /**
     * animation type when open
     * default: easeInEaseOut
     */
    openAnimation?: AnimationType;
    /**
     * animation type when close
     * default: easeInEaseOut
     */
    closeAnimation?: AnimationType;
    /**
     * duration when open
     * default: 300
     */
    openDuration?: number;
    /**
     * duration when close
     * default: 300
     */
    closeDuration?: number;
}
export interface AccordionProps extends CommonAccordionProps {
    /**
     * section data sets
     */
    sections: Section[];
    /**
     * keyExtractor for Flatlist
     */
    keyExtractor?: (item: Section, index: number) => string;
    /**
     * enable expand multiple item
     * default: false
     */
    expandMultiple?: boolean;
    /**
     * accordion wrapper style
     */
    wrapperStyle?: ViewStyleProp;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<FlatList<any>>>>;
export default _default;
//# sourceMappingURL=Accordion.d.ts.map