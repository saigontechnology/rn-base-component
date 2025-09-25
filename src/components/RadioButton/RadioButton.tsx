import React, {forwardRef, useMemo, useRef, useState} from 'react'
import type {LayoutChangeEvent, StyleProp, TextStyle, View, ViewStyle} from 'react-native'
import {StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {responsiveHeight} from '../../helpers'
import {Bounceable, IBounceableProps} from './Bounceable'
import {useTheme} from '../../hooks'

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
  disabled?: boolean
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
  label?: string

  /**
   * update new value
   */
  value?: boolean
}
// Default values moved to theme configuration

export const RadioButton = forwardRef<View, IRadioButtonProps>(
  (
    {
      style,
      isRemainActive,
      innerContainerStyle,
      outerSize,
      innerSize,
      ringColor,
      innerBackgroundColor,
      onPressButton,
      initial,
      textComponent,
      textContainerStyle,
      disabled,
      disableOpacity,
      textStyle,
      label,
      value,
      wrapperStyle,
      ...rest
    },
    ref,
  ) => {
    const RadioButtonTheme = useTheme().components.RadioButton
    const [isActive, setIsActive] = useState(initial ?? RadioButtonTheme.initial)

    const actualOuterSize = outerSize ?? RadioButtonTheme.outerSize ?? 45
    const actualInnerSize = innerSize ?? RadioButtonTheme.innerSize ?? 25

    const outer = useMemo(
      () => ({
        width: responsiveHeight(actualOuterSize),
        height: responsiveHeight(actualOuterSize),
        border: responsiveHeight(actualOuterSize / 2),
      }),
      [actualOuterSize],
    )
    const inner = useMemo(
      () => ({
        width: responsiveHeight(actualInnerSize),
        height: responsiveHeight(actualInnerSize),
        border: responsiveHeight(actualInnerSize / 2),
      }),
      [actualInnerSize],
    )

    const widthBounceableRef = useRef({
      value: outer.width,
    }).current
    const heightBounceableRef = useRef({
      value: outer.height,
    }).current

    const handlePress = () => {
      if (disabled ?? RadioButtonTheme.disabled) {
        return
      }
      if (isRemainActive !== undefined && isRemainActive !== null) {
        onPressButton && onPressButton(isRemainActive)
      } else {
        setIsActive(!isActive)
        onPressButton && onPressButton(!isActive)
      }
    }

    const renderLabelText = () =>
      textComponent ||
      (label ? (
        <LabelTextView
          disabled={!!(disabled ?? RadioButtonTheme.disabled)}
          disableOpacity={disableOpacity ?? RadioButtonTheme.disableOpacity}
          style={textContainerStyle ?? RadioButtonTheme.textContainerStyle}>
          <LabelText style={textStyle ?? RadioButtonTheme.textStyle}>{label}</LabelText>
        </LabelTextView>
      ) : null)

    const handleLayout = (event: LayoutChangeEvent) => {
      const {width, height} = event.nativeEvent.layout
      widthBounceableRef.value = width
      heightBounceableRef.value = height
    }

    return (
      <RadioButtonWrapper testID="container" style={wrapperStyle ?? RadioButtonTheme.wrapperStyle}>
        <Bounceable
          testID="bounceable"
          ref={ref}
          disabled={disabled ?? RadioButtonTheme.disabled}
          onLayout={handleLayout}
          style={StyleSheet.flatten([
            styles.bounceStyle,
            {
              width: outer.width,
              height: outer.height,
              borderRadius: outer.border,
              borderColor: ringColor ?? RadioButtonTheme.ringColor,
              opacity:
                disabled ?? RadioButtonTheme.disabled ? disableOpacity ?? RadioButtonTheme.disableOpacity : 1,
              borderWidth: RadioButtonTheme.borderWidth,
            },
            style ?? RadioButtonTheme.style,
          ])}
          onPress={handlePress}
          {...rest}>
          <RadioButtonInnerContainer
            maxWidth={widthBounceableRef.value}
            maxHeight={heightBounceableRef.value}
            inner={inner}
            isActive={!!(value ?? isActive)}
            innerBackgroundColor={innerBackgroundColor ?? RadioButtonTheme.innerBackgroundColor ?? '#007AFF'}
            style={innerContainerStyle ?? RadioButtonTheme.innerContainerStyle}
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

const LabelTextView = styled.View<{disabled: boolean; disableOpacity?: number}>(props => ({
  marginLeft: props.theme?.spacing?.small,
  opacity: props.disabled ? props.disableOpacity : 1,
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
