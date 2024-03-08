import React, { ReactNode } from 'react';
import { type StyleProp, type TextStyle, type TouchableOpacityProps, type ViewStyle } from 'react-native';
import { TextProps } from '../Text/Text';
export type ButtonProps = {
    /**
     * Color of the label
     */
    textColor?: string;
    /**
     * Color of the button background
     */
    backgroundColor?: string;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean;
    /**
     * Color of the disabled button background
     */
    disabledColor?: string;
    /**
     * Button will have outline style
     */
    outline?: boolean;
    /**
     * The outline color
     */
    outlineColor?: string;
    /**
     * The outline width
     */
    outlineWidth?: number;
    /**
     * Custom border radius.
     */
    borderRadius?: number;
    /**
     * The size of text.
     */
    textSize?: number;
    /**
     * Custom left/right icon
     */
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    /**
     * Custom text props.
     */
    textProps?: TextProps;
    /**
     * Custom text style.
     */
    textStyle?: StyleProp<TextStyle>;
    /**
     * Custom container style.
     */
    style?: StyleProp<ViewStyle>;
} & TouchableOpacityProps;
declare const Button: React.FC<ButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map