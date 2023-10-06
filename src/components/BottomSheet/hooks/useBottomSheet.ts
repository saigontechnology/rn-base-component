import {useContext} from 'react'
import {BottomSheetContext, type BottomSheetContextType} from '../contexts'

export function useBottomSheet(): BottomSheetContextType {
  const context = useContext(BottomSheetContext)

  if (context === null) {
    throw "'useBottomSheet' cannot be used out of the BottomSheet!"
  }

  return context
}
