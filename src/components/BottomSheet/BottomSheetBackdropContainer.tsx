import React, {memo} from 'react'
import {TapGestureHandler, TapGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import styled from 'styled-components'
import {useBottomSheet} from './hooks/useBottomSheet'

const Container = styled(Animated.View)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'black',
  opacity: 0.5,
}))

const BottomSheetBackdropContainerComponent = () => {
  const {animatedPositionIndex, close} = useBottomSheet()

  const opacity = useDerivedValue(() => (animatedPositionIndex.value !== -1 ? 0.5 : 0), [])

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(opacity.value),
    }),
    [],
  )

  const gestureHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onFinish: () => {
        runOnJS(close)()
      },
    },
    [close],
  )

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Container style={animatedStyle} />
    </TapGestureHandler>
  )
}

const BottomSheetBackdropContainer = memo(BottomSheetBackdropContainerComponent)
BottomSheetBackdropContainer.displayName = 'BottomSheetBackdropContainer'

export default BottomSheetBackdropContainer
