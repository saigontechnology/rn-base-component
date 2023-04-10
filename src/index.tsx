import {requireNativeComponent, UIManager, Platform, ViewStyle} from 'react-native'
import {default as ButtonComponent} from './components/Button'
import {default as SliderComponent} from './components/Slider/Slider'

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

export const Button = ButtonComponent
export const Slider = SliderComponent

export * from './core'
export * from './hooks'
export * from './theme'
