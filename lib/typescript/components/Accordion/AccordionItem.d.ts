import React, { PropsWithChildren } from 'react';
import type { ITheme } from '../../theme';
import type { CommonAccordionProps, Section } from './Accordion';
export type Theme = {
    theme?: ITheme;
};
export interface AccordionItemProps extends PropsWithChildren<CommonAccordionProps> {
    /**
     * onPress item event
     */
    onPress: (keyExtractorItem: string) => void;
    /**
     * keyExtractor for item
     */
    keyExtractorItem: string;
    expanded?: boolean;
    index: number;
    item: Section;
}
declare const _default: React.NamedExoticComponent<AccordionItemProps>;
export default _default;
//# sourceMappingURL=AccordionItem.d.ts.map