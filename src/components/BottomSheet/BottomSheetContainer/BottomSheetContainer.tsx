import React, {memo, useCallback, useMemo, useRef} from 'react'
import {LayoutChangeEvent, StyleProp, View, ViewStyle} from 'react-native'
import styled from 'styled-components'
import {styles} from './styles'
import type {BottomSheetContainerProps} from './types'

const Container = styled(View)(() => ({
  ...styles.container,
}))

const BottomSheetContainerComponent = ({
  // containerHeight,
  // containerOffset,
  topInset = 0,
  bottomInset = 0,
  shouldCalculateHeight = true,
  detached,
  style,
  children,
}: BottomSheetContainerProps) => {
  const containerRef = useRef<View>(null)

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      style,
      styles.container,
      {
        top: topInset,
        bottom: bottomInset,
        overflow: detached ? 'visible' : 'hidden',
      },
    ],
    [style, detached, topInset, bottomInset],
  )

  const handleContainerLayout = useCallback(function handleContainerLayout({
    nativeEvent: {
      layout: {height},
    },
  }: LayoutChangeEvent) {
    // containerHeight.value = height
    // containerRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
    //   containerOffset.value = {
    //     top: pageY ?? 0,
    //     left: 0,
    //     right: 0,
    //     bottom: Math.max(0, WINDOW_HEIGHT - ((pageY ?? 0) + height + (StatusBar.currentHeight ?? 0))),
    //   }
    // })
  }, [])

  return (
    <Container
      ref={containerRef}
      pointerEvents="box-none"
      onLayout={shouldCalculateHeight ? handleContainerLayout : undefined}
      style={containerStyle}
      children={children}
    />
  )
}

const BottomSheetContainer = memo(BottomSheetContainerComponent)
BottomSheetContainer.displayName = 'BottomSheetContainer'

export default BottomSheetContainer
