import React from 'react';
import { SliderFixedRangeProps } from './SliderFixedRange';
import type { ITheme } from '../../theme';
import { StyleProp, ViewStyle, TextInputProps, Insets, TextStyle } from 'react-native';
import { SliderRangeProps } from './SliderRange';
type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';
type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
type TextAlign = 'center' | 'end' | 'justify' | 'left' | 'match-parent' | 'right' | 'start';
type Size = {
    width: number;
    height: number;
};
type SliderInfo = {
    range: number;
    trackWidth: number;
};
type AnimatedGHContext = {
    startX: number;
    currentPoint: number;
};
type ThumbContainerStyle = {
    theme?: ITheme;
    thumbSize: Size;
    hasThumbComponent?: boolean;
    background?: string;
};
type TrackPointStyle = {
    width: number;
};
interface AnimatedLabelProps extends TextInputProps {
    text: string;
}
type InnerSliderProps = {
    /** The value to which the slider thumb should be rounded */
    roundToValue?: number;
    /** custom element that can be used to replace the default thumb of the slider */
    thumbComponent?: React.ReactElement;
    /** Callback function to handle the change in slider value */
    onValueChange?: (value: number) => void;
};
export interface ISliderCommonProps {
    /** The maximum value of the slider */
    maximumValue?: number;
    /** The minimum value of the slider */
    minimumValue?: number;
    /** The step value for the slider */
    step?: number;
    /** The alwaysShowValue indicates whether the value of the slider should always be displayed */
    alwaysShowValue?: boolean;
    /** Whether to show the point on the slider's track */
    showTrackPoint?: boolean;
    /** Determines whether the thumb can be moved by directly touching the thumb or only by dragging the slider track */
    tapToSeek?: boolean;
    /** The touchable area is used to increase the size of the thumb and make it easier to interact with */
    hitSlopPoint?: Insets | number;
    /** Style for the slider component. */
    style?: StyleProp<ViewStyle>;
    /** Style of the slider's track */
    trackStyle?: StyleProp<ViewStyle>;
    /** Style for the track's filled portion (in case of a range slider) */
    trackedStyle?: StyleProp<ViewStyle>;
    /** Style of the point on the slider's track */
    trackPointStyle?: StyleProp<ViewStyle>;
    /** The bgColorLabelView sets the background color of the view that displays the value of the slider */
    bgColorLabelView?: string;
    /** The labelStyle sets the style of the text that displays the value of the slider */
    labelStyle?: StyleProp<TextStyle>;
    /** Style of the slider's thumb */
    thumbStyle?: StyleProp<ViewStyle>;
    /** Size of the slider's thumb */
    thumbSize?: Size;
}
type SliderPropsWithOptionalWidth = {
    sliderWidth?: number;
} & ({
    showTrackPoint: true;
    sliderWidth: number;
} | {
    showTrackPoint?: false;
    sliderWidth?: number;
});
type SliderProps = ISliderCommonProps & InnerSliderProps & SliderPropsWithOptionalWidth;
type SliderComponentProps = React.FC<SliderProps> & {
    Range: React.FC<SliderRangeProps>;
    FixedRange: React.FC<SliderFixedRangeProps>;
    Fixed: React.FC<SliderProps>;
};
declare const Slider: SliderComponentProps;
export type { Size, SliderInfo, AnimatedGHContext, ThumbContainerStyle, SliderProps, SliderPropsWithOptionalWidth, AnimatedLabelProps, TrackPointStyle, FlexDirection, Position, TextAlign, };
export default Slider;
//# sourceMappingURL=Slider.d.ts.map