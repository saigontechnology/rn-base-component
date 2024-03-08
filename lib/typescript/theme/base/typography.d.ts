declare const typography: {
    fontWeights: {
        hairline: number;
        thin: number;
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
        extrabold: number;
        black: number;
        extraBlack: number;
    };
    fonts: {
        heading: undefined;
        body: undefined;
        mono: undefined;
        regular: string | undefined;
        bold: string | undefined;
        italic: string | undefined;
    };
    fontSizes: {
        '2xs': number;
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        '2xl': number;
        '3xl': number;
        '4xl': number;
        '5xl': number;
        '6xl': number;
        '7xl': number;
        '8xl': number;
        '9xl': number;
    };
};
export type ITypography = typeof typography;
export type IFontSize = keyof typeof typography.fontSizes;
export type IFontWeight = keyof typeof typography.fontWeights;
export type IFont = keyof typeof typography.fonts;
export default typography;
//# sourceMappingURL=typography.d.ts.map