import React, {forwardRef, memo, useCallback, useImperativeHandle, useMemo} from 'react'
import {runOnJS, useAnimatedKeyboard, useDerivedValue, useSharedValue} from 'react-native-reanimated'
import BottomSheetBackdrop from './BottomSheetBackdrop/BottomSheetBackdrop'
import BottomSheetContainer from './BottomSheetContainer/BottomSheetContainer'
import BottomSheetContent from './BottomSheetContent/BottomSheetContent'
import BottomSheetContentContainer from './BottomSheetContentContainer/BottomSheetContentContainer'
import BottomSheetHeader from './BottomSheetHeader/BottomSheetHeader'
import {DEFAULT_CONTENT_HEIGHT, INITIAL_CONTENT_HEIGHT_POSITIVE} from './constants'
import {BottomSheetContextType, BottomSheetProvider} from './contexts/BottomSheetProvider'
import type {BottomSheetMethods, BottomSheetProps} from './types'

const BottomSheetComponent = forwardRef<BottomSheetMethods, BottomSheetProps>(
  (
    {
      // configurations
      isVisible,
      contentHeight = DEFAULT_CONTENT_HEIGHT,
      title,
      bottomInset,
      shouldPushContentWithKeyboardSize,
      // callbacks
      onChangeValue: _onChangeValue,
      onConfirm,
      // styles
      style,
      backdropStyle,
      contentContainerStyle,
      contentHeaderStyle,
      contentStyle,
      // components
      children,
    },
    ref,
  ) => {
    // variables
    const keyboard = useAnimatedKeyboard()
    const animatedIsVisible = useSharedValue(isVisible)
    const animatedCalculateContentHeight = useSharedValue(0)
    const animatedContentHeight = useDerivedValue(() => {
      if (contentHeight > 0) {
        return contentHeight
      }
      return animatedCalculateContentHeight.value
    }, [])
    const animatedContentTranslateY = useDerivedValue(() => {
      runOnJS(_onChangeValue)(animatedIsVisible.value)

      if (animatedIsVisible.value) {
        return shouldPushContentWithKeyboardSize ? -keyboard.height.value : 0
      } else {
        return animatedContentHeight.value + bottomInset || INITIAL_CONTENT_HEIGHT_POSITIVE
      }
    }, [])

    // callbacks
    const handleOpen = useCallback(() => {
      animatedIsVisible.value = true
    }, [animatedIsVisible])
    const handleClose = useCallback(() => {
      animatedIsVisible.value = false
    }, [animatedIsVisible])

    // context
    const contextValues: BottomSheetContextType = useMemo(
      () => ({
        animatedIsVisible,
        open: handleOpen,
        close: handleClose,
      }),
      [animatedIsVisible, handleClose, handleOpen],
    )

    useImperativeHandle(ref, () => contextValues)

    return (
      <BottomSheetProvider value={contextValues}>
        <BottomSheetContainer style={style}>
          <BottomSheetBackdrop style={backdropStyle} />
          <BottomSheetContentContainer
            style={contentContainerStyle}
            {...{animatedCalculateContentHeight, animatedContentHeight, animatedContentTranslateY}}>
            <BottomSheetHeader style={contentHeaderStyle} {...{title, onConfirm}} />
            <BottomSheetContent style={contentStyle}>{children}</BottomSheetContent>
          </BottomSheetContentContainer>
        </BottomSheetContainer>
      </BottomSheetProvider>
    )
  },
)

BottomSheetComponent.displayName = 'BottomSheetComponent'
const BottomSheet = memo(BottomSheetComponent)
BottomSheet.displayName = 'BottomSheet'

export default BottomSheet