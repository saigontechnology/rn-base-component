import React from 'react';
import type { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { IBounceableProps } from './Bounceable';
type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
type CustomTextStyleProp = StyleProp<TextStyle>;
export interface IRadioButtonProps extends IBounceableProps {
    /**
     * set custom style for wrapper
     */
    wrapperStyle?: CustomStyleProp;
    /**
     * ring custom style
     */
    style?: CustomStyleProp;
    /**
     * size of ring container
     */
    outerSize?: number;
    /**
     * size of circle container
     */
    innerSize?: number;
    /**
     * set radio button color
     */
    ringColor?: string;
    /**
     * Radio button inner custom style
     */
    innerContainerStyle?: CustomStyleProp;
    /**
     * this will disable the built-in state of activation
     * Note that the initial state will be overwrite by "initial" prop
     * default: undefined
     */
    isRemainActive?: boolean;
    /**
     * set the initial activation of the radio button
     */
    initial?: boolean;
    /**
     * change the inner circle's background color
     * default: 'blue'
     */
    innerBackgroundColor?: string;
    /**
     * onPress event
     */
    onPressButton?: (isActive: boolean) => void;
    /**
     * text label component
     */
    textComponent?: React.ReactNode;
    /**
     * style for container of text label
     */
    textContainerStyle?: CustomStyleProp;
    /**
     * disable radio button
     */
    disable?: boolean;
    /**
     * set opacity for text
     */
    disableOpacity?: number;
    /**
     * text label style
     * default: 0.5
     */
    textStyle?: CustomTextStyleProp;
    /**
     * set value for text label
     */
    text?: string;
}
export declare const RadioButton: React.ForwardRefExoticComponent<IRadioButtonProps & React.RefAttributes<View>>;
export {};
//# sourceMappingURL=RadioButton.d.ts.map