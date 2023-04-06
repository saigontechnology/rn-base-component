import React from 'react'
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  TextInput,
} from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import Animated, {useAnimatedProps, useAnimatedStyle} from 'react-native-reanimated'
import type {Position, Size, ThumbContainerStyle} from '../Slider'
import {colors} from '../../../helpers/colors'
import {isIOS, metrics} from '../../../helpers/metrics'
import type {StyleProp, TextProps, ViewStyle} from 'react-native'

const AnimatedText = Animated.createAnimatedComponent(TextInput)

interface ThumbProps {
  text: string
  bgColorLabelView: string
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
  bgColorLabelView = colors.primary,
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
        style={[{backgroundColor: bgColorLabelView}, !alwaysShowValue && opacityStyle]}
        thumbSize={thumbSize}>
        <TriangleDown style={[{borderBottomColor: bgColorLabelView, transform: [{rotate: '180deg'}]}]} />
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
  borderRadius: 10,
  borderWidth: props.hasThumbComponent ? 0 : 1,
  backgroundColor: props.hasThumbComponent ? 'transparent' : colors.white,
}))

const TriangleDown = styled.View({
  position: 'absolute',
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
})

const LabelContainer = styled(Animated.View)((props: ThumbContainerStyle) => ({
  position: 'absolute' as Position,
  top: -40,
  bottom: props.thumbSize.height + metrics.xxs,
  borderRadius: 5,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
}))

const Label = styled(AnimatedText)({
  color: colors.white,
  padding: isIOS ? 5 : 2,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 16,
  width: '100%',
})

export {Thumb}
