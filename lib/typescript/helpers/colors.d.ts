import type { ColorValue } from 'react-native';
export interface IColors {
    readonly primary: string;
    readonly black: string;
    readonly white: string;
    readonly gray: string;
    readonly red: string;
    readonly textDisabled: string;
    readonly placeHolderText: string;
    readonly backgroundDisabled: string;
}
declare const colors: {
    primary: string;
    black: string;
    white: string;
    gray: string;
    red: string;
    textDisabled: string;
    placeHolderText: string;
    backgroundDisabled: string;
};
declare const getColorOpacity: (color: string, opacity: number) => ColorValue | string | null | undefined;
export { colors, getColorOpacity };
//# sourceMappingURL=colors.d.ts.map