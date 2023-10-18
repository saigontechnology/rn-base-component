import React from 'react'
import {GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload} from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import Animated, {useAnimatedProps, useAnimatedStyle} from 'react-native-reanimated'
import type {Position, Size, TextAlign, ThumbContainerStyle} from '../Slider'
import {isIOS, metrics, responsiveHeight} from '../../../helpers/metrics'
import type {StyleProp, TextProps, ViewStyle} from 'react-native'
import type {ITheme} from '../../../theme'

interface ThumbProps {
  text: string
  bgColorLabelView?: string
  labelStyle: StyleProp<TextProps>
  thumbSize: Size
  thumbStyle: StyleProp<ViewStyle>
  thumbComponent?: React.ReactElement
  alwaysShowValue?: boolean
  animatedThumbStyle: ReturnType<typeof useAnimatedStyle>
  opacityStyle: ReturnType<typeof useAnimatedStyle>
  animatedProps: ReturnType<typeof useAnimatedProps>
  onGestureEvent: (event: GestureEvent<PanGestureHandlerEventPayload>) => void
}

const Thumb: React.FunctionComponent<ThumbProps> = ({
  text,
  bgColorLabelView,
  labelStyle,
  alwaysShowValue,
  thumbSize,
  thumbComponent,
  animatedProps,
  thumbStyle,
  animatedThumbStyle,
  opacityStyle,
  onGestureEvent,
}) => (
  <PanGestureHandler onGestureEvent={onGestureEvent}>
    <ThumbContainerAnimaged
      thumbSize={thumbSize}
      hasThumbComponent={!!thumbComponent}
      style={[thumbStyle, animatedThumbStyle]}>
      <LabelContainerAnimated
        background={bgColorLabelView}
        style={!alwaysShowValue && opacityStyle}
        thumbSize={thumbSize}>
        <TriangleDown background={bgColorLabelView} />
        <LabelAnimated {...{animatedProps}} style={labelStyle} editable={false} defaultValue={text} />
      </LabelContainerAnimated>
      {thumbComponent}
    </ThumbContainerAnimaged>
  </PanGestureHandler>
)

const ThumbContainer = styled.View((props: ThumbContainerStyle) => ({
  position: 'absolute' as Position,
  height: props.thumbSize.height,
  width: props.thumbSize.width,
  borderRadius: props.theme?.borderWidths.huge,
  borderWidth: props.hasThumbComponent ? 0 : 1,
  // backgroundColor: props.hasThumbComponent ? 'transparent' : props.theme?.colors.backgroundColor,
  backgroundColor: 'transparent',
}))
const ThumbContainerAnimaged = Animated.createAnimatedComponent(ThumbContainer)

const TriangleDown = styled.View<ViewStyle & {background?: string; theme: ITheme}>(({background, theme}) => ({
  position: 'absolute' as Position,
  bottom: -5,
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: 5,
  borderRightWidth: 5,
  borderBottomWidth: 10,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: background || theme?.colors.primary,
  transform: [{rotate: '180deg'}] as unknown as string,
}))

const LabelContainer = styled.View((props: ThumbContainerStyle) => ({
  position: 'absolute' as Position,
  top: -responsiveHeight(props.theme?.spacing?.titanic || 0),
  bottom: props.thumbSize.height + metrics.xxs,
  borderRadius: props.theme?.borderWidths.compact,
  backgroundColor: props.background || props.theme?.colors.primary,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  margin: !isIOS ? -(responsiveHeight(props.theme?.spacing.tiny || 0) || 0) : 0,
}))
const LabelContainerAnimated = Animated.createAnimatedComponent(LabelContainer)

const Label = styled.TextInput(({theme}: {theme: ITheme}) => ({
  color: theme.colors.white,
  padding: responsiveHeight(isIOS ? theme.borderWidths.small : theme.spacing.tiny),
  textAlign: 'center' as TextAlign,
  fontWeight: theme.fontWeights.bold,
  fontSize: theme.fontSizes.sm,
  width: '100%',
}))
const LabelAnimated = Animated.createAnimatedComponent(Label)

export {Thumb}
