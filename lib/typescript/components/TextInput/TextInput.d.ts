import React, { ForwardRefExoticComponent } from 'react';
import type { StyleProp, TextInputProps as RNTextInputProperties, TextProps, TextStyle, ViewStyle } from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import { CustomIconProps } from './components';
export interface TextInputProps extends RNTextInputProperties {
    /** Style for container */
    containerStyle?: StyleProp<ViewStyle>;
    /** If false, text is not editable. The default value is true. */
    editable?: boolean;
    /** Styling for Input Component Container */
    inputContainerStyle?: StyleProp<ViewStyle>;
    /** Style for Input Component */
    inputStyle?: StyleProp<TextStyle>;
    /** Add a label on top of the input */
    label?: string;
    /** Add star beside the label */
    isRequire?: boolean;
    /** Styling for the label. You can only use this if label is a string */
    labelStyle?: StyleProp<TextStyle>;
    /** Props to be passed to the React Native Text component used to display the label or React Component used instead of simple string in label prop */
    labelProps?: TextProps;
    /** React node to be rendered on the left side of the input component */
    leftComponent?: React.ReactNode;
    /** React node to be rendered on the right side of the input component */
    rightComponent?: React.ReactNode;
    /** Display the error message at the bottom */
    errorText?: string;
    /** Props to be passed to the error text component */
    errorProps?: TextProps;
    /** Callback that is called when the text input is focused */
    onFocus?: () => void;
    /** Callback that is called when the text input is blurred */
    onBlur?: () => void;
}
interface CompoundedComponent extends ForwardRefExoticComponent<TextInputProps & React.RefAttributes<TextInputRef>> {
    Outlined: ForwardRefExoticComponent<TextInputProps & React.RefAttributes<TextInputRef>>;
    Flat: ForwardRefExoticComponent<TextInputProps & React.RefAttributes<TextInputRef>>;
    Icon: React.FC<CustomIconProps>;
}
export type TextInputRef = Pick<RNTextInput, 'focus' | 'blur' | 'clear'>;
export interface InputContainerProps {
    multiline?: boolean;
    isFocused?: boolean;
}
export declare const TextInput: CompoundedComponent;
export {};
//# sourceMappingURL=TextInput.d.ts.map