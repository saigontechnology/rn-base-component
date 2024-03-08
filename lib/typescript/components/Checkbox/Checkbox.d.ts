import React from 'react';
import { StyleProp, ViewStyle, TextStyle, ImageStyle, ImageSourcePropType, TouchableWithoutFeedbackProps } from 'react-native';
type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;
type CustomImageStyleProp = StyleProp<ImageStyle> | Array<StyleProp<ImageStyle>>;
type BaseTouchableProps = Pick<TouchableWithoutFeedbackProps, Exclude<keyof TouchableWithoutFeedbackProps, 'onPress'>>;
export interface ICheckboxProps extends BaseTouchableProps {
    /** size of the checkbox */
    size?: number;
    /** the text of the checkbox */
    label?: string;
    /** border radius of the checkbox */
    borderRadius?: number;
    /** border width the checkbox */
    borderWidth?: number;
    /** color when checkbox is checked, default #ffc484 */
    fillColor?: string;
    /** define the status of checkbox */
    isChecked?: boolean;
    /** color when checkbox is unchecked, default transparent */
    unfillColor?: string;
    /** color of the check mark, default is white */
    checkMarkColor?: string;
    /** opacity of checkbox when disabled, default 0.5 */
    disableOpacity?: number;
    /** disable the checkbox text */
    disableText?: boolean;
    /** disableBuiltInState of checkbox */
    disableBuiltInState?: boolean;
    /** bounceEffectIn animation when press */
    bounceEffectIn?: number;
    /** bounceEffectOut animation when press */
    bounceEffectOut?: number;
    /** define custom icon component */
    iconComponent?: React.ReactNode;
    /** define custom text component */
    textComponent?: React.ReactNode;
    /** custom style for the icon */
    iconStyle?: CustomStyleProp;
    /** custom style for the inner icon */
    innerIconStyle?: CustomStyleProp;
    /** style of container view  */
    style?: CustomStyleProp;
    /** style of checkbox text */
    labelStyle?: CustomTextStyleProp;
    /** style icon image */
    iconImageStyle?: CustomImageStyleProp;
    /** checkbox text container style */
    textContainerStyle?: CustomStyleProp;
    /** define image source show when checkbox is checked */
    checkIconImageSource?: ImageSourcePropType;
    /** callback when checkbox is change state */
    onChange?: (checked: boolean) => void;
}
interface ICheckboxMethods {
    onHandlePress: () => void;
}
export declare const Checkbox: React.ForwardRefExoticComponent<ICheckboxProps & React.RefAttributes<ICheckboxMethods>>;
export {};
//# sourceMappingURL=Checkbox.d.ts.map