import {requireNativeComponent, UIManager, Platform, ViewStyle} from 'react-native'
import Button from './components/Button'
import {default as ProgressComponent} from './components/Progress/Progress'
import type {ITheme} from './theme'

declare module 'styled-components/native' {
  export interface DefaultTheme extends ITheme {}
}

const LINKING_ERROR = `The package 'rn-base-component' doesn't seem to be linked. Make sure: \n\n ${Platform.select(
  {ios: "- You have run 'pod install'\n", default: ''},
)} - You rebuilt the app after installing the package\n- You are not using Expo Go\n`

type RnBaseComponentProps = {
  color: string
  style: ViewStyle
}

const ComponentName = 'RnBaseComponentView'

export const RnBaseComponentView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<RnBaseComponentProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR)
      }

export const RnBaseButton = Button
export const Progress = ProgressComponent

export * from './components'
export * from './core'
export * from './hooks'
export * from './theme'
