import React from 'react'
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  TextInput,
} from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import Animated, {useAnimatedProps, useAnimatedStyle} from 'react-native-reanimated'
import type {Position, Size, TextAlign, ThumbContainerStyle} from '../Slider'
import {isIOS, metrics} from '../../../helpers/metrics'
import type {StyleProp, TextProps, ViewStyle} from 'react-native'
import type {ITheme} from '../../../theme'

const AnimatedText = Animated.createAnimatedComponent(TextInput)

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
    <ThumbContainer
      thumbSize={thumbSize}
      hasThumbComponent={!!thumbComponent}
      style={[thumbStyle, animatedThumbStyle]}>
      <LabelContainer
        background={bgColorLabelView}
        style={!alwaysShowValue && opacityStyle}
        thumbSize={thumbSize}>
        <TriangleDown background={bgColorLabelView} style={{transform: [{rotate: '180deg'}]}} />
        <Label {...{animatedProps}} style={labelStyle} editable={false} defaultValue={text} />
      </LabelContainer>
      {thumbComponent}
    </ThumbContainer>
  </PanGestureHandler>
)

const ThumbContainer = styled(Animated.View)((props: ThumbContainerStyle) => ({
  position: 'absolute' as Position,
  height: props.thumbSize.height,
  width: props.thumbSize.width,
  borderRadius: props.theme?.borderWidths.huge,
  borderWidth: props.hasThumbComponent ? 0 : 1,
  // backgroundColor: props.hasThumbComponent ? 'transparent' : props.theme?.colors.backgroundColor,
  backgroundColor: 'transparent',
}))

const TriangleDown = styled.View(({background, theme}: {background?: string; theme: ITheme}) => ({
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
}))

const LabelContainer = styled(Animated.View)((props: ThumbContainerStyle) => ({
  position: 'absolute' as Position,
  top: -(props.theme?.spacing.xxxl ?? 40),
  bottom: props.thumbSize.height + metrics.xxs,
  borderRadius: props.theme?.borderWidths.medium,
  backgroundColor: props.background || props.theme?.colors.primary,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  margin: !isIOS ? -(props.theme?.spacing.mini || 0) : 0,
}))

const Label = styled(AnimatedText)(({theme}: {theme: ITheme}) => ({
  color: theme.colors.textLightColor,
  padding: isIOS ? theme.spacing.micro : theme.spacing.tiny,
  textAlign: 'center' as TextAlign,
  fontWeight: theme.fontWeights.bold,
  fontSize: theme.fontSizes.sm,
  width: '100%',
}))

export {Thumb}
