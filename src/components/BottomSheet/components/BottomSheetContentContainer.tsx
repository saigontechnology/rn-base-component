import React, {memo, useCallback, useMemo, useRef} from 'react'
import {StyleSheet, type LayoutChangeEvent, type StyleProp, type View, type ViewStyle} from 'react-native'
import Animated, {SharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated'
import type {ITheme} from 'src/theme'
import styled from 'styled-components/native'
import {useTheme} from '../../../hooks'

const Container = styled(Animated.View)<{theme: ITheme}>(({theme}) => ({
  borderTopRightRadius: theme?.sizes?.petite,
  borderTopLeftRadius: theme?.sizes?.petite,
}))

export interface BottomSheetContentContainerProps {
  // configurations
  animatedCalculateContentHeight: SharedValue<number>
  animatedContentHeight: SharedValue<number>
  animatedContentTranslateY: SharedValue<number>

  // styles
  style?: StyleProp<ViewStyle>

  // components
  children?: React.ReactNode
}

const BottomSheetContentContainerComponent: React.FC<BottomSheetContentContainerProps> = ({
  animatedCalculateContentHeight,
  animatedContentHeight,
  animatedContentTranslateY,

  style,
  children,
}) => {
  const theme = useTheme()
  const containerRef = useRef<View>(null)

  const animatedContentStyle = useAnimatedStyle(
    () => ({
      height: animatedContentHeight.value > 0 ? animatedContentHeight.value : undefined,
      transform: [{translateY: withTiming(animatedContentTranslateY.value)}],
    }),
    [],
  )

  const contentStyle = useMemo(
    () => StyleSheet.flatten([{backgroundColor: theme.colors.white}, style, animatedContentStyle]),
    [animatedContentStyle, style, theme.colors.white],
  )

  const handleLayout = useCallback(
    ({
      nativeEvent: {
        layout: {height},
      },
    }: LayoutChangeEvent) => {
      animatedCalculateContentHeight.value = height
    },
    [animatedCalculateContentHeight],
  )

  return (
    <Container ref={containerRef} style={contentStyle} onLayout={handleLayout}>
      {children}
    </Container>
  )
}

const BottomSheetContentContainer = memo(BottomSheetContentContainerComponent)
BottomSheetContentContainer.displayName = 'BottomSheetContentContainer'

export default BottomSheetContentContainer
