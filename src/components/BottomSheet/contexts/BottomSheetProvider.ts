import {createContext} from 'react'
import type {SharedValue} from 'react-native-reanimated'

export interface BottomSheetContextType {
  animatedIsVisible: SharedValue<boolean>

  open: () => void
  close: () => void
}

export const BottomSheetContext = createContext<BottomSheetContextType | null>(null)

export const BottomSheetProvider = BottomSheetContext.Provider
