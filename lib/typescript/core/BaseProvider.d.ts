import React from 'react';
import { ITheme } from '../theme';
import type { IColorModeContextProps } from './color-mode/type';
export type IBaseContext = {
    theme: ITheme;
} | IColorModeContextProps;
export declare const BaseContext: React.Context<IBaseContext | null>;
export interface BaseProviderProps {
    children?: React.ReactNode;
    theme?: ITheme;
}
export declare const BaseProvider: ({ children, theme }: BaseProviderProps) => React.JSX.Element;
//# sourceMappingURL=BaseProvider.d.ts.map