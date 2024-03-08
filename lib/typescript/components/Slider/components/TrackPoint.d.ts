import React from 'react';
import type { Insets, StyleProp, ViewStyle } from 'react-native';
interface TrackPointProps {
    sliderWidth: number;
    totalPoint: number;
    hitSlopPoint?: Insets | number;
    activeOpacity?: number;
    trackPointStyle?: StyleProp<ViewStyle>;
    onPressPoint?: (point: number) => void;
}
declare const TrackPoint: React.FunctionComponent<TrackPointProps>;
export { TrackPoint };
//# sourceMappingURL=TrackPoint.d.ts.map