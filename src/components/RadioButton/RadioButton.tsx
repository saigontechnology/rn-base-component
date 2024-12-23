import React, {forwardRef, useMemo, useRef, useState} from 'react'
import type {LayoutChangeEvent, StyleProp, TextStyle, View, ViewStyle} from 'react-native'
import {StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {responsiveHeight, responsiveWidth} from '../../helpers'
import {Bounceable, IBounceableProps} from './Bounceable'
import {theme} from '../../theme'

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

  /**
   * update new value
   */
  value?: boolean
}
const OUTER_SIZE_DEFAULT = 45
const INNER_SIZE_DEFAULT = 25
const OPACITY_DEFAULT = 0.5

export const RadioButton = forwardRef<View, IRadioButtonProps>(
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
      value,
      wrapperStyle,
      ...rest
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
        <Bounceable
          testID="bounceable"
          ref={ref}
          disabled={disable}
          onLayout={handleLayout}
          style={StyleSheet.flatten([
            styles.bounceStyle,
            {
              width: outer.width,
              height: outer.height,
              borderRadius: outer.border,
              borderColor: ringColor,
              opacity: disable ? disableOpacity : 1,
              borderWidth: theme.borderWidths.little,
            },
            style,
          ])}
          onPress={handlePress}
          {...rest}>
          <RadioButtonInnerContainer
            maxWidth={widthBounceableRef.value}
            maxHeight={heightBounceableRef.value}
            inner={inner}
            isActive={value ?? isActive}
            innerBackgroundColor={innerBackgroundColor}
            style={innerContainerStyle}
            testID="circle"
          />
        </Bounceable>
        {renderLabelText()}
      </RadioButtonWrapper>
    )
  },
)

const RadioButtonWrapper = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
})

const RadioButtonInnerContainer = styled.View<
  {
    inner: {width: number; height: number; border: number}
    maxWidth: number
    maxHeight: number
  } & ({isActive: true; innerBackgroundColor: string} | {isActive: false})
>(({inner, maxWidth, maxHeight, ...rest}) => ({
  maxWidth: maxWidth,
  maxHeight: maxHeight,
  width: inner.width,
  height: inner.height,
  borderRadius: inner.border,
  backgroundColor: rest.isActive ? rest.innerBackgroundColor : 'transparent',
}))

const LabelTextView = styled.View<{disable: boolean; disableOpacity?: number}>(props => ({
  marginLeft: props.theme?.spacing?.small,
  opacity: props.disable ? props.disableOpacity : 1,
}))

const LabelText = styled.Text(props => ({
  color: props?.theme?.colors?.black,
  fontSize: props?.theme?.fontSizes?.md,
}))

const styles = StyleSheet.create({
  bounceStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
})
