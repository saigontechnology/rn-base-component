/* eslint-disable react-native/no-inline-styles */
import React, {memo, useCallback} from 'react'
import {LayoutChangeEvent, View} from 'react-native'
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import Button from '../../Button'
import type {ITheme} from 'src/theme'
import styled from 'styled-components/native'
import {useBottomSheet} from '../hooks/useBottomSheet'
import type {BottomSheetHeaderProps} from './types'
import {useTheme} from '../../../hooks'

const Container = styled(View)<{theme: ITheme}>(({theme}) => ({
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme?.sizes?.petite,
}))

const Title = styled(Animated.Text)<{theme: ITheme}>(() => ({
  flex: 1,
  textAlign: 'center',
}))

const RightContainer = styled(View)<{theme: ITheme}>(({theme}) => ({
  position: 'absolute',
  right: theme?.sizes?.petite,
}))

const LeftContainer = styled(View)<{theme: ITheme}>(({theme}) => ({
  position: 'absolute',
  left: theme?.sizes?.petite,
}))

const BottomSheetHeaderComponent: React.FC<BottomSheetHeaderProps> = ({
  // configurations
  title,
  // styles
  style,
  rightComponentStyle,
  leftComponentStyle,
  // callbacks
  onConfirm,
  // components
  rightComponent,
  leftComponent,
}) => {
  const theme = useTheme()
  const {close} = useBottomSheet()
  const animatedMarginLeftTitle = useSharedValue(0)
  const animatedMarginRightTitle = useSharedValue(0)
  const animatedTitleStyle = useAnimatedStyle(
    () => ({
      marginLeft: animatedMarginLeftTitle.value,
      marginRight: animatedMarginRightTitle.value,
    }),
    [],
  )

  const handleLayoutLeft = useCallback(
    ({
      nativeEvent: {
        layout: {width},
      },
    }: LayoutChangeEvent) => {
      animatedMarginLeftTitle.value = width
    },
    [animatedMarginLeftTitle],
  )

  const handleLayoutRight = useCallback(
    ({
      nativeEvent: {
        layout: {width},
      },
    }: LayoutChangeEvent) => {
      animatedMarginRightTitle.value = width
    },
    [animatedMarginRightTitle],
  )

  const renderButton = useCallback(
    (text: string, onPress?: () => void) => (
      <Button
        onPress={onPress}
        text={text}
        textColor={theme.colors.black}
        style={{backgroundColor: theme.colors.white, paddingHorizontal: 0, paddingVertical: 0}}
        textStyle={{fontWeight: 'normal'}}
      />
    ),
    [],
  )

  return (
    <Container style={style}>
      <Title style={animatedTitleStyle} numberOfLines={1}>
        {title}
      </Title>

      <LeftContainer style={leftComponentStyle} onLayout={handleLayoutLeft}>
        {leftComponent || renderButton('Cancel', close)}
      </LeftContainer>

      <RightContainer style={rightComponentStyle} onLayout={handleLayoutRight}>
        {rightComponent || renderButton('Confirm', onConfirm)}
      </RightContainer>
    </Container>
  )
}

const BottomSheetHeader = memo(BottomSheetHeaderComponent)
BottomSheetHeader.displayName = 'BottomSheetHeader'

export default BottomSheetHeader
