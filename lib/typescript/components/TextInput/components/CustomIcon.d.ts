import React from 'react';
import type { ImageResizeMode, ImageSourcePropType, ImageStyle, StyleProp, ViewStyle } from 'react-native';
export interface CustomIconProps {
    source: ImageSourcePropType;
    size?: number;
    color?: string;
    resizeMode?: ImageResizeMode;
    iconContainerStyle?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}
export declare const CustomIcon: React.FC<CustomIconProps>;
//# sourceMappingURL=CustomIcon.d.ts.map