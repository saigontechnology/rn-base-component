import * as React from 'react'
import {StyleProp, ViewStyle, StyleSheet, TextStyle, LayoutChangeEvent, View} from 'react-native'
import Bounceable from './Bounceable'
import styled from 'styled-components/native'
import {metrics, responsiveWidth, responsiveHeight} from '../../helpers/metrics'
import type {IBounceableProps} from './Bounceable'
import type {ITheme} from '../../theme'
import {theme} from '../../theme'

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomTextStyleProp = StyleProp<TextStyle>

type TrackStyle = {
  maxWidth: number
  maxHeight: number
}

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

const RadioButton = React.forwardRef<View, IRadioButtonProps>(
  (
    {
      style,
      isRemainActive = undefined,
      innerContainerStyle,
      outerSize = 45,
      innerSize = 25,
      ringColor = theme.colors.darkBlue,
      innerBackgroundColor = theme.colors.darkBlue,
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

    const renderLabelText = () =>
      textComponent ||
      (text ? (
        <LabelTextView
          style={StyleSheet.flatten([textContainerStyle, styles.disableStyle(disable, disableOpacity)])}>
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
            styles.container(ringColor, outerSize),
            style,
            styles.disableStyle(disable, disableOpacity),
            styles.constantBackgroundColor,
          ])}
          onPress={handlePress}
          {...props}>
          <RadioButtonInnerContainer
            maxWidth={widthBounceableRef.value}
            maxHeight={heightBounceableRef.value}
            testID="circle"
            style={StyleSheet.flatten([
              styles.innerStyle(isRemainActive || isActive, innerBackgroundColor, innerSize),
              innerContainerStyle,
            ])}
          />
        </Bounceable>
        {renderLabelText()}
      </RadioButtonWrapper>
    )
  },
)

RadioButton.displayName = 'RadioButton'

export default RadioButton

const styles = StyleSheet.create<any>({
  container: (ringColor: string, outerSize: number) => ({
    width: responsiveWidth(outerSize),
    height: responsiveHeight(outerSize),
    borderWidth: metrics.borderRadius,
    borderRadius: responsiveHeight(outerSize / 2),
    borderColor: ringColor,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  innerStyle: (isActive: boolean, innerBackgroundColor: string, innerSize: number) => ({
    width: responsiveWidth(innerSize),
    height: responsiveHeight(innerSize),
    borderRadius: responsiveHeight(innerSize / 2),
    backgroundColor: isActive ? innerBackgroundColor : 'transparent',
  }),
  disableStyle: (disable: boolean, disableOpacity: number) => ({
    opacity: disable ? disableOpacity : 1,
  }),
  constantBackgroundColor: {
    backgroundColor: 'transparent',
  },
})

const RadioButtonWrapper = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
})

const RadioButtonInnerContainer = styled.View((props: TrackStyle) => ({
  maxWidth: props.maxWidth,
  maxHeight: props.maxHeight,
}))

const LabelTextView = styled.View({
  marginLeft: responsiveWidth(16),
})

const LabelText = styled.Text((props: {theme: ITheme}) => ({
  color: props?.theme?.colors?.black,
  fontSize: props?.theme?.fontSizes?.md,
}))
