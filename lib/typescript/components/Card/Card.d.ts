import React, { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
export interface CardProps extends PropsWithChildren {
    /**
     * handle press on card
     */
    onPress?: () => void;
    /**
     * style for card
     */
    style?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
}
declare const Card: React.FC<CardProps>;
export default Card;
//# sourceMappingURL=Card.d.ts.map