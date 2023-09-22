import {View, Text, Dimensions, StyleSheet, TextInput, ViewProps} from 'react-native'
import React, {forwardRef, memo, useCallback, useImperativeHandle, useMemo, useState} from 'react'
import styled from 'styled-components'
import BottomSheetBackdropContainer from './BottomSheetBackdropContainer'
import BottomSheetContainer from './BottomSheetContainer/BottomSheetContainer'
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  useWorkletCallback,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import type {BottomSheetMethods, BottomSheetProps} from './types'
import BottomSheetContent from './BottomSheetContent/BottomSheetContent'
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler'
import {
  BOTTOM_SHEET_STATE,
  INITIAL_CONTAINER_HEIGHT,
  INITIAL_CONTAINER_OFFSET,
  SCREEN_HEIGHT,
  WINDOW_HEIGHT,
} from './constants'
import {useNormalizedSnapPoints} from './utils'
import {BottomSheetProvider} from './contexts/BottomSheetProvider'
import {styles} from './styles'

const {width, height} = Dimensions.get('window')

const Container = styled(View)(() => ({
  width,
  height,
  position: 'absolute',
}))

const BottomSheetComponent = (
  {
    // configurations
    index: _providedIndex = 0,
    snapPoints: _providedSnapPoints = [],
    enableDynamicSizing,
    enablePanDownToClose,

    // styles
    style: _providedStyle,
    backgroundStyle,
    handleIndicatorStyle,

    // layout
    containerHeight: _providedContainerHeight = 0,
    contentHeight: _providedContentHeight,
    // containerOffset: _providedContainerOffset = INITIAL_CONTAINER_OFFSET,
    topInset = 0,
    bottomInset = 0,
    maxDynamicContentSize,

    // keyboard
    keyboardBehavior,

    // callbacks
    onChange,
    onAnimate,

    // components
    backdropComponent,
    backgroundComponent,
    footerComponent,
    children,
  },
  ref,
) => {
  const keyboard = useAnimatedKeyboard()

  const [pointerEvents, setPointerEvents] = useState<ViewProps['pointerEvents']>()

  const shouldHandleKeyboardEvents = useSharedValue(false)
  const animatedContainerTranslateY = useSharedValue(0)
  const animatedPositionIndex = useSharedValue(_providedIndex)
  const animatedPosition = useSharedValue(_providedSnapPoints.at(animatedPositionIndex.value) || 0)

  // const animatedContainerHeight = useDerivedValue(() => {
  //   const verticalInset = topInset + bottomInset
  //   return _providedContainerHeight - verticalInset
  // }, [topInset, bottomInset])
  const animatedKeyboardHeight = useDerivedValue(() => {
    // if (!keyboard.height.value) {
    //   return 0
    // }
    const keyboardHeight = keyboard.height.value
    const contentHeight = animatedPosition.value
    const betweenBlank = SCREEN_HEIGHT - contentHeight - topInset - bottomInset
    const contentKeyboardHeight = Math.min(betweenBlank, keyboardHeight)
    // if (keyboardHeight) {

    // }
    // return -keyboard.height.value / animatedPosition.value
    return Math.abs(0)
  }, [])
  const animatedBottomSheetState = useDerivedValue(() => {
    if (animatedPositionIndex.value === -1) {
      return BOTTOM_SHEET_STATE.close
    } else {
      return BOTTOM_SHEET_STATE.open
    }
  }, [])
  const animatedContentHeight = useDerivedValue(() => {
    if (animatedBottomSheetState.value === BOTTOM_SHEET_STATE.close) {
      animatedContainerTranslateY.value = 0
      return withTiming(animatedPosition.value)
    }
    return animatedContainerTranslateY.value - animatedKeyboardHeight.value
  }, [])

  // const animatedSnapPoints = useNormalizedSnapPoints(
  //   _providedSnapPoints,
  //   animatedContainerHeight,
  //   // animatedContentHeight,
  // )

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [{translateY: animatedContentHeight.value}],
      height: animatedPosition.value,
    }),
    [],
  )

  // callbacks
  const handlePositionIndex = useCallback(
    (newIndex: number) => {
      animatedPositionIndex.value = newIndex
    },
    [animatedPositionIndex],
  )
  const handleOpen = useCallback(() => {
    handlePositionIndex(0)
    setPointerEvents('auto')
  }, [handlePositionIndex])
  const handleClose = useCallback(() => {
    handlePositionIndex(-1)
    setPointerEvents('none')
  }, [handlePositionIndex])

  const pan = Gesture.Pan()
    .onBegin(() => {})
    .onChange(event => {
      animatedContainerTranslateY.value = Math.max(0, event.translationY)
    })
    .onFinalize(() => {
      if (animatedContainerTranslateY.value >= animatedPosition.value / 2) {
        runOnJS(handleClose)()
      } else {
        animatedContainerTranslateY.value = withTiming(0)
      }
    })

  // styles
  const contentStyles = useMemo(
    () => [{backgroundColor: 'white'}, _providedStyle, animatedStyles],
    [_providedStyle, animatedStyles],
  )

  // context
  const contextValues = useMemo(
    () => ({
      animatedContainerTranslateY,
      shouldHandleKeyboardEvents,
      animatedPositionIndex,
      animatedPosition,

      // callbacks
      open: handleOpen,
      close: handleClose,
    }),
    [
      animatedContainerTranslateY,
      animatedPosition,
      animatedPositionIndex,
      handleClose,
      handleOpen,
      shouldHandleKeyboardEvents,
    ],
  )

  useImperativeHandle(ref, () => contextValues)

  return (
    <BottomSheetProvider value={contextValues}>
      <GestureHandlerRootView style={StyleSheet.absoluteFillObject} pointerEvents={pointerEvents}>
        <BottomSheetBackdropContainer animatedPositionIndex={animatedPositionIndex} />
        <BottomSheetContainer
        // containerHeight={_providedContainerHeight}
        // containerOffset={animatedContainerOffset}
        // topInset={topInset}
        // bottomInset={bottomInset}
        >
          <GestureDetector gesture={pan}>
            <Animated.View style={contentStyles}>{children}</Animated.View>
          </GestureDetector>
        </BottomSheetContainer>
      </GestureHandlerRootView>
    </BottomSheetProvider>
  )
}

const BottomSheet = memo(forwardRef<BottomSheetMethods, BottomSheetProps>(BottomSheetComponent))
BottomSheet.displayName = 'BottomSheet'

export default BottomSheet
