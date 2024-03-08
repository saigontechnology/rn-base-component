import React from 'react';
import type { ISliderCommonProps } from './Slider';
import type { NumberRange } from './SliderRange';
export interface SliderFixedRangeProps extends ISliderCommonProps {
    /** The width of the slider */
    sliderWidth: number;
    /** The custom React element to be used for the left thumb of the slider */
    leftThumbComponent?: React.ReactElement;
    /** The custom React element to be used for the right thumb of the slider */
    rightThumbComponent?: React.ReactElement;
    /**
     * The callback function that is called when the value of the slider changes
     * The value is an object with a minimum and a maximum property
     */
    onValueChange?: (value: NumberRange) => void;
}
declare const SliderFixedRange: React.FC<SliderFixedRangeProps>;
export default SliderFixedRange;
//# sourceMappingURL=SliderFixedRange.d.ts.map