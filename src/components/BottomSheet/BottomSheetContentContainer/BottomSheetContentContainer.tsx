import React, {memo, useCallback, useMemo, useRef} from 'react'
import type {LayoutChangeEvent, View} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import type {ITheme} from 'src/theme'
import styled from 'styled-components/native'
import type {BottomSheetContentContainerProps} from './types'

const Container = styled(Animated.View)<{theme: ITheme}>(({theme}) => ({
  borderTopRightRadius: theme?.sizes?.petite,
  borderTopLeftRadius: theme?.sizes?.petite,
}))

const BottomSheetContentContainerComponent: React.FC<BottomSheetContentContainerProps> = ({
  animatedCalculateContentHeight,
  animatedContentHeight,
  animatedContentTranslateY,

  style,
  children,
}) => {
  const containerRef = useRef<View>(null)

  const animatedContentStyle = useAnimatedStyle(
    () => ({
      height: animatedContentHeight.value > 0 ? animatedContentHeight.value : undefined,
      transform: [{translateY: withTiming(animatedContentTranslateY.value)}],
    }),
    [],
  )

  const contentStyle = useMemo(
    () => [{backgroundColor: 'white'}, style, animatedContentStyle],
    [animatedContentStyle, style],
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
