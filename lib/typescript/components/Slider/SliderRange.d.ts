import React from 'react';
import type { ISliderCommonProps } from './Slider';
export type Value = {
    left: number;
    right: number;
};
export type SliderAnimated = {
    opacity: number;
    zIndex: number;
};
export type ContainerProps = {
    width: number;
};
export type NumberRange = {
    maximum: number;
    minimum: number;
};
export interface SliderRangeProps extends ISliderCommonProps {
    roundToValue?: number;
    sliderWidth: number;
    leftThumbComponent?: React.ReactElement;
    rightThumbComponent?: React.ReactElement;
    onValueChange?: (value: NumberRange) => void;
}
declare const SliderRange: React.FC<SliderRangeProps>;
export default SliderRange;
//# sourceMappingURL=SliderRange.d.ts.map