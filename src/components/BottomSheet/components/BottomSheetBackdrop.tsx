import React, {memo, useMemo} from 'react'
import {TapGestureHandler, TapGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import styled from 'styled-components'
import {useBottomSheet} from '../hooks'
import type {ITheme} from 'src/theme'
import {StyleSheet, type StyleProp, type ViewStyle} from 'react-native'

const Container = styled(Animated.View)<{theme: ITheme}>(({theme}) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme?.colors?.black,
  opacity: theme?.opacity?.partiallyOpaque,
}))

export interface BottomSheetBackdropProps {
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

const BottomSheetBackdropComponent: React.FC<BottomSheetBackdropProps> = ({style, children}) => {
  const {animatedIsVisible, close} = useBottomSheet()

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(animatedIsVisible.value ? 0.5 : 0),
    }),
    [],
  )

  const containerStyle = useMemo(() => StyleSheet.flatten([animatedStyle, style]), [animatedStyle, style])

  const gestureHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onFinish: () => {
        runOnJS(close)()
      },
    },
    [],
  )

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Container style={containerStyle}>{children}</Container>
    </TapGestureHandler>
  )
}

const BottomSheetBackdrop = memo(BottomSheetBackdropComponent)
BottomSheetBackdrop.displayName = 'BottomSheetBackdrop'

export default BottomSheetBackdrop
