/* eslint-disable @typescript-eslint/no-empty-interface */
import {requireNativeComponent, UIManager, Platform, ViewStyle} from 'react-native'
import type {ITheme} from './theme'
import Button from './components/Button'
import Card from './components/Card/Card'
import {default as TextInputComponent} from './components/TextInput/TextInput'

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

export * from './components'
export const RnBaseButton = Button
export {Card}
export const TextInput = TextInputComponent

export * from './core'
export * from './hooks'
export * from './theme'
