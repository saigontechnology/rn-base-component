import {createContext} from 'react'
import type {SharedValue} from 'react-native-reanimated'

export interface BottomSheetContextType {
  animatedContainerTranslateY: SharedValue<number>
  shouldHandleKeyboardEvents: SharedValue<boolean>
  animatedPositionIndex: SharedValue<number>
  animatedPosition: SharedValue<number>

  open: () => void
  close: () => void
}

export const BottomSheetContext = createContext<BottomSheetContextType | null>(null)

export const BottomSheetProvider = BottomSheetContext.Provider
