import React from 'react';
import { GestureEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';
import type { Size } from '../Slider';
import { type StyleProp, type TextProps, type ViewStyle } from 'react-native';
interface ThumbProps {
    text: string;
    bgColorLabelView?: string;
    labelStyle: StyleProp<TextProps>;
    thumbSize: Size;
    thumbStyle: StyleProp<ViewStyle>;
    thumbComponent?: React.ReactElement;
    alwaysShowValue?: boolean;
    animatedThumbStyle: ReturnType<typeof useAnimatedStyle>;
    opacityStyle: ReturnType<typeof useAnimatedStyle>;
    animatedProps: ReturnType<typeof useAnimatedProps>;
    onGestureEvent: (event: GestureEvent<PanGestureHandlerEventPayload>) => void;
}
declare const Thumb: React.FunctionComponent<ThumbProps>;
export { Thumb };
//# sourceMappingURL=Thumb.d.ts.map