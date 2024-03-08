import { ViewStyle } from 'react-native';
import type { ITheme } from './theme';
declare module 'styled-components/native' {
    interface DefaultTheme extends ITheme {
    }
}
type RnBaseComponentProps = {
    color: string;
    style: ViewStyle;
};
export declare const RnBaseComponentView: import("react-native").HostComponent<RnBaseComponentProps> | (() => never);
export * from './components';
export * from './core';
export * from './hooks';
export * from './theme';
//# sourceMappingURL=index.d.ts.map