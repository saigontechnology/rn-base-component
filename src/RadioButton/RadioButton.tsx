import * as React from 'react'
import {StyleProp, ViewStyle, StyleSheet, TextStyle, LayoutChangeEvent, PressableProps} from 'react-native'
import Bounceable from '../Bounceable/Bounceable'
import styled from 'styled-components/native'
import {metrics, responsiveWidth, responsiveHeight} from '../helpers/metrics'
import type {IBounceableProps} from '../Bounceable/Bounceable'

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>

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

const RadioButton = React.forwardRef<PressableProps, IRadioButtonProps>(
  (
    {
      style,
      isRemainActive = undefined,
      innerContainerStyle,
      ringColor,
      innerBackgroundColor = 'blue',
      onPressButton,
      initial,
      textComponent,
      textContainerStyle,
      disable,
      disableOpacity = 0.5,
      textStyle,
      text,
      wrapperStyle,
      ...props
    },
    ref,
  ) => {
    const [isActive, setIsActive] = React.useState(initial || false)
    const widthBounceableRef = React.useRef({
      value: styles.container().width,
    }).current
    const heightBounceableRef = React.useRef({
      value: styles.container().width,
    }).current

    const handlePress = () => {
      if (isRemainActive !== undefined && isRemainActive !== null) {
        onPressButton && onPressButton(isRemainActive)
      } else {
        setIsActive(!isActive)
        onPressButton && onPressButton(isActive)
      }
    }

    const renderLabelText = () => {
      return (
        textComponent || (
          <LabelTextView
            style={StyleSheet.flatten([textContainerStyle, styles.disableStyle(disable, disableOpacity)])}>
            <LabelText style={textStyle}>{text}</LabelText>
          </LabelTextView>
        )
      )
    }

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
            styles.container(ringColor),
            style,
            styles.disableStyle(disable, disableOpacity),
            styles.constantBackgroundColor,
          ])}
          onPress={handlePress}
          {...props}>
          <RadioButtonInnerContainer
            testID="circle"
            style={StyleSheet.flatten([
              styles.innerStyle(isRemainActive || isActive, innerBackgroundColor),
              innerContainerStyle,
              styles.maxDimensionStyle(widthBounceableRef.value, heightBounceableRef.value),
            ])}
          />
        </Bounceable>
        {renderLabelText()}
      </RadioButtonWrapper>
    )
  },
)

export default React.memo(RadioButton)

const styles = StyleSheet.create<any>({
  container: (ringColor = 'blue') => ({
    width: responsiveWidth(45),
    height: responsiveHeight(45),
    borderWidth: metrics.borderRadius,
    borderRadius: responsiveHeight(25),
    borderColor: ringColor,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  innerStyle: (isActive: boolean, innerBackgroundColor: string) => ({
    width: responsiveWidth(25),
    height: responsiveHeight(25),
    borderRadius: responsiveHeight(25),
    backgroundColor: isActive ? innerBackgroundColor : 'transparent',
  }),
  disableStyle: (disable: boolean, disableOpacity: number) => ({
    opacity: disable ? disableOpacity : 1,
  }),
  maxDimensionStyle: (maxWidth: number, maxHeight: number) => ({
    maxWidth: maxWidth,
    maxHeight: maxHeight,
  }),
  constantBackgroundColor: {
    backgroundColor: 'transparent',
  },
})

const RadioButtonWrapper = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
})

const RadioButtonInnerContainer = styled.View({})

const LabelTextView = styled.View({
  marginLeft: responsiveWidth(16),
})

const LabelText = styled.Text({})
