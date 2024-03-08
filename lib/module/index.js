/* eslint-disable @typescript-eslint/no-empty-interface */
import { requireNativeComponent, UIManager, Platform } from 'react-native';
const LINKING_ERROR = `The package 'rn-base-component' doesn't seem to be linked. Make sure: \n\n ${Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
})} - You rebuilt the app after installing the package\n- You are not using Expo Go\n`;
const ComponentName = 'RnBaseComponentView';
export const RnBaseComponentView = UIManager.getViewManagerConfig(ComponentName) != null ? requireNativeComponent(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
export * from './components';
export * from './core';
export * from './hooks';
export * from './theme';
//# sourceMappingURL=index.js.map