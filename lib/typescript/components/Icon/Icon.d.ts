import React from 'react';
import type { ImageStyle, ImageSourcePropType, ImageResizeMode, StyleProp, ViewStyle, Insets } from 'react-native';
export type IconProps = {
    source: ImageSourcePropType;
    size?: number;
    disabled?: boolean;
    color?: string;
    hitSlop?: Insets;
    style?: StyleProp<ImageStyle>;
    resizeMode?: ImageResizeMode;
    testID?: string;
    onPress?: () => void;
    onLongPress?: () => void;
    buttonStyle?: StyleProp<ViewStyle>;
};
export declare const Icon: React.FunctionComponent<IconProps>;
//# sourceMappingURL=Icon.d.ts.map