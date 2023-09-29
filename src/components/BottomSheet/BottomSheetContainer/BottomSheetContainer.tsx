import React, {memo, useMemo} from 'react'
import {StyleProp, StyleSheet, ViewStyle} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Animated, {useAnimatedProps} from 'react-native-reanimated'
import {useBottomSheet} from '../hooks/useBottomSheet'
import type {BottomSheetContainerProps} from './types'
import type {ViewProps} from 'react-native'

const BottomSheetContainerComponent: React.FC<BottomSheetContainerProps> = ({style, children}) => {
  const {animatedIsVisible} = useBottomSheet()

  const animatedProps = useAnimatedProps(
    () => ({
      pointerEvents: animatedIsVisible.value ? 'auto' : ('none' as ViewProps['pointerEvents']),
    }),
    [],
  )

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
      },
      style,
    ],
    [style],
  )

  return (
    <Animated.View style={containerStyle} animatedProps={animatedProps}>
      <GestureHandlerRootView style={containerStyle}>{children}</GestureHandlerRootView>
    </Animated.View>
  )
}

const BottomSheetContainer = memo(BottomSheetContainerComponent)
BottomSheetContainer.displayName = 'BottomSheetContainer'

export default BottomSheetContainer