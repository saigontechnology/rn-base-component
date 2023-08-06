import React, {forwardRef, useMemo, useRef, useState} from 'react'
import {StyleProp, ViewStyle, TextStyle, LayoutChangeEvent, View, Text} from 'react-native'
import styled from 'styled-components/native'
import {metrics, responsiveHeight, responsiveWidth} from '../../helpers/metrics'
import Bounceable, {IBounceableProps} from './Bounceable'
import {theme, ITheme} from '../../theme'

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomTextStyleProp = StyleProp<TextStyle>

export interface IRadioButtonProps extends IBounceableProps {
  /**
   * set custom style for wrapper
   */
  wrapperStyle?: CustomStyleProp
  /**
   * ring custom style
   */
  style?: CustomStyleProp
  /**
   * size of ring container
   */
  outerSize?: number
  /**
   * size of circle container
   */
  innerSize?: number
  /**
   * set radio button color
   */
  ringColor?: string
  /**
   * Radio button inner custom style
   */
  innerContainerStyle?: CustomStyleProp
  /**
   * this will disable the built-in state of activation
   * Note that the initial state will be overwrite by "initial" prop
   * default: undefined
   */
  isRemainActive?: boolean
  /**
   * set the initial activation of the radio button
   */
  initial?: boolean
  /**
   * change the inner circle's background color
   * default: 'blue'
   */
  innerBackgroundColor?: string
  /**
   * onPress event
   */
  onPressButton?: (isActive: boolean) => void
  /**
   * text label component
   */
  textComponent?: React.ReactNode
  /**
   * style for container of text label
   */
  textContainerStyle?: CustomStyleProp
  /**
   * disable radio button
   */
  disable?: boolean
  /**
   * set opacity for text
   */
  disableOpacity?: number
  /**
   * text label style
   * default: 0.5
   */
  textStyle?: CustomTextStyleProp
  /**
   * set value for text label
   */
  text?: string
}
const OUTER_SIZE_DEFAULT = 45
const INNER_SIZE_DEFAULT = 25
const OPACITY_DEFAULT = 0.5

const RadioButton = forwardRef<View, IRadioButtonProps>(
  (
    {
      style,
      isRemainActive,
      innerContainerStyle,
      outerSize = OUTER_SIZE_DEFAULT,
      innerSize = INNER_SIZE_DEFAULT,
      ringColor = theme.colors.darkBlue,
      innerBackgroundColor = theme.colors.darkBlue,
      onPressButton,
      initial,
      textComponent,
      textContainerStyle,
      disable,
      disableOpacity = OPACITY_DEFAULT,
      textStyle,
      text,
      wrapperStyle,
      ...props
    },
    ref,
  ) => {
    const [isActive, setIsActive] = useState(initial || false)

    const outer = useMemo(
      () => ({
        width: responsiveWidth(outerSize),
        height: responsiveHeight(outerSize),
        border: responsiveHeight(outerSize / 2),
      }),
      [outerSize],
    )
    const inner = useMemo(
      () => ({
        width: responsiveWidth(innerSize),
        height: responsiveHeight(innerSize),
        border: responsiveHeight(innerSize / 2),
      }),
      [innerSize],
    )

    const widthBounceableRef = useRef({
      value: outer.width,
    }).current
    const heightBounceableRef = useRef({
      value: outer.height,
    }).current

    const handlePress = () => {
      if (isRemainActive !== undefined && isRemainActive !== null) {
        onPressButton && onPressButton(isRemainActive)
      } else {
        setIsActive(!isActive)
        onPressButton && onPressButton(isActive)
      }
    }

    const renderLabelText = () =>
      textComponent ||
      (text ? (
        <LabelTextView disable={!!disable} disableOpacity={disableOpacity} style={textContainerStyle}>
          <LabelText style={textStyle}>{text}</LabelText>
        </LabelTextView>
      ) : null)

    const handleLayout = (event: LayoutChangeEvent) => {
      const {width, height} = event.nativeEvent.layout
      widthBounceableRef.value = width
      heightBounceableRef.value = height
    }

    return (
      <RadioButtonWrapper testID="container" style={wrapperStyle}>
        <BounceableStyle
          outer={outer}
          disable={!!disable}
          disableOpacity={disableOpacity}
          ringColor={ringColor}
          testID="bounceable"
          ref={ref}
          disabled={disable}
          onLayout={handleLayout}
          style={style}
          onPress={handlePress}
          {...props}>
          <RadioButtonInnerContainer
            maxWidth={widthBounceableRef.value}
            maxHeight={heightBounceableRef.value}
            inner={inner}
            isActive={isActive}
            innerBackgroundColor={innerBackgroundColor}
            style={innerContainerStyle}
            testID="circle"
          />
        </BounceableStyle>
        {renderLabelText()}
      </RadioButtonWrapper>
    )
  },
)

RadioButton.displayName = 'RadioButton'

export default RadioButton

const BounceableStyle = styled(Bounceable)<{
  outer: {width: number; height: number; border: number}
  ringColor: string
  disable: boolean
  disableOpacity: number
}>(({outer, ringColor, disable, disableOpacity}) => ({
  width: outer.width,
  height: outer.height,
  borderWidth: metrics.borderRadius,
  borderRadius: outer.border,
  borderColor: ringColor,
  alignItems: 'center',
  justifyContent: 'center',
  opacity: disable ? disableOpacity : 1,
  backgroundColor: 'transparent',
}))

const RadioButtonWrapper = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const RadioButtonInnerContainer = styled(View)<{
  inner: {width: number; height: number; border: number}
  maxWidth: number
  maxHeight: number
  isActive: boolean
  innerBackgroundColor: string
}>(({inner, maxWidth, maxHeight, isActive, innerBackgroundColor}) => ({
  maxWidth: maxWidth,
  maxHeight: maxHeight,
  width: inner.width,
  height: inner.height,
  borderRadius: inner.border,
  backgroundColor: isActive ? innerBackgroundColor : 'transparent',
}))

const LabelTextView = styled(View)<{disable: boolean; disableOpacity: number}>(
  ({disable, disableOpacity}) => ({
    marginLeft: responsiveWidth(16),
    opacity: disable ? disableOpacity : 1,
  }),
)

const LabelText = styled(Text)((props: {theme: ITheme}) => ({
  color: props?.theme?.colors?.black,
  fontSize: props?.theme?.fontSizes?.md,
}))
