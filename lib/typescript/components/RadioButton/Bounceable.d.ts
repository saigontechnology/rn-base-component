import React from 'react';
import { View } from 'react-native';
import type { PressableProps, ViewStyle, StyleProp } from 'react-native';
type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
export interface IBounceableProps extends PressableProps {
    /**
     * The target value when onPressIn
     * default: 0.93
     */
    bounceEffectIn?: number;
    /**
     * The target value when onPressOut
     * default: 1
     */
    bounceEffectOut?: number;
    /**
     * The initial velocity of the animation in units per second when onPressIn
     * default: 0.1
     */
    bounceVelocityIn?: number;
    /**
     * The initial velocity of the animation in units per second when onPressOut
     * default: 0.4
     */
    bounceVelocityOut?: number;
    /**
     * The bounciness parameter determines how bouncy the animation should be when onPress
     * default: 0
     */
    bouncinessValue?: number;
    /**
     * Custom style for Bounceable
     */
    style?: CustomStyleProp;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<IBounceableProps & React.RefAttributes<View>>>;
export default _default;
//# sourceMappingURL=Bounceable.d.ts.map