import type React from 'react'
import type {ViewStyle} from 'react-native'

export interface BottomSheetHeaderProps {
  // configurations
  title?: string
  // styles
  style?: ViewStyle
  rightComponentStyle?: ViewStyle
  leftComponentStyle?: ViewStyle
  // callbacks
  onConfirm?: () => void
  // components
  children?: React.ReactNode
  rightComponent?: React.ReactNode
  leftComponent?: React.ReactNode
}
