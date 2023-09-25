import type React from 'react'
import type {ViewStyle} from 'react-native'
import type {BottomSheetContextType} from './contexts/BottomSheetProvider'

export interface BottomSheetProps {
  // configurations
  isVisible: boolean
  contentHeight?: number
  title?: string
  bottomInset: number
  shouldPushContentWithKeyboardSize?: boolean
  // callbacks
  onChangeValue: (value: boolean) => void
  onConfirm?: () => void
  // styles
  style?: ViewStyle
  backdropStyle?: ViewStyle
  contentContainerStyle?: ViewStyle
  contentHeaderStyle?: ViewStyle
  contentStyle?: ViewStyle
  // components
  children?: React.ReactNode
}

export type BottomSheetMethods = BottomSheetContextType
