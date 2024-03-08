import React, { ReactNode } from 'react';
import { KeyboardTypeOptions, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
interface CodeInputProps extends TextInputProps {
    /** define style for cell */
    cellStyle?: StyleProp<ViewStyle>;
    /** define style for valued Cell */
    filledCellStyle?: StyleProp<ViewStyle>;
    /** define style for cell when cell is focused */
    focusCellStyle?: StyleProp<ViewStyle>;
    /** define style for text in the cell */
    textStyle?: StyleProp<TextStyle>;
    /** define secure view style when using secureTextEntry mode */
    secureViewStyle?: StyleProp<ViewStyle>;
    /** define style for text in the cell when cell is focused */
    focusTextStyle?: StyleProp<TextStyle>;
    /** cell count */
    length?: number;
    /** callback when complete  */
    onSubmit?: (val: string) => void;
    /** render custom view for cursor/indicator */
    customCursor?: () => ReactNode;
    /** render custom view for cursor/indicator */
    secureTextEntry?: boolean;
    /** keyboard type */
    keyboardType?: KeyboardTypeOptions;
    withCursor?: boolean;
    placeholder?: string;
    placeholderTextColor?: string;
}
export declare const CodeInput: React.FC<CodeInputProps>;
export {};
//# sourceMappingURL=CodeInput.d.ts.map