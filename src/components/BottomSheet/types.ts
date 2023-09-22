import type React from 'react'
import type {Insets, ViewStyle} from 'react-native'
import type Animated from 'react-native-reanimated'
import type {AnimatedStyleProp} from 'react-native-reanimated'
import {BottomSheetContextType} from './contexts/BottomSheetProvider'

export interface BottomSheetBackgroundProps {}
export interface BottomSheetFooterProps {}

export interface BottomSheetProps {
  // configurations
  index?: number
  snapPoints?: Array<number>
  enableDynamicSizing?: boolean
  enablePanDownToClose?: boolean

  // styles
  style?: ViewStyle | AnimatedStyleProp<ViewStyle>
  backgroundStyle?: ViewStyle
  handleIndicatorStyle?: ViewStyle

  // layout
  containerHeight: number
  contentHeight: number | Animated.SharedValue<number>
  containerOffset: Animated.SharedValue<Insets>
  topInset?: number
  bottomInset?: number
  maxDynamicContentSize?: number

  // keyboard
  keyboardBehavior?: 'extend' | 'fillParent' | 'interactive'

  // callbacks
  onChange?: (index: number) => void
  onAnimate?: (fromIndex: number, toIndex: number) => void

  // components
  backdropComponent?: React.FC<BottomSheetBackgroundProps>
  backgroundComponent?: React.FC<BottomSheetBackgroundProps>
  footerComponent?: React.FC<BottomSheetBackgroundProps>
}

export interface BottomSheetMethods extends BottomSheetContextType {}
