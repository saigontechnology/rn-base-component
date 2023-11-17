import React, {ReactNode} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import type {ImageStyle, StyleProp, TextStyle, ViewStyle} from 'react-native'
import styled from 'styled-components/native'
import {TextBold} from '../Text/Text'
import {Images} from '../../theme'
import {hitSlop, metrics} from '../../helpers'
import {useTheme} from '../../hooks'

export interface HeaderProps {
  /**
   * The top padding for the notch of device, usually we will use react-native-safe-area-context to get the inset
   */
  paddingTop?: number
  /**
   * Height of the header
   */
  height?: number
  /**
   * Style of Header container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Width of Header bottom border
   */
  borderBottomWidth?: number
  /**
   * Color of Header bottom border
   */
  borderBottomColor?: string
  /**
   * Title of the header, will be use if no custom CenterComponent is defined
   */
  title?: string
  /**
   * The color of Header title
   */
  titleColor?: string
  /**
   * The custom style of Header title
   */
  titleStyle?: StyleProp<TextStyle>
  /**
   * Background color of the Header
   */
  backgroundColor?: string
  /**
   * Show the back to previous screen icon, default value is true
   */
  hasBackButton?: boolean
  /**
   * The color of back to previous screen icon
   */
  backIconColor?: string
  /**
   * The action for the back to previous screen icon
   */
  backButtonPress?: () => void
  /**
   * The left component of the Header
   */
  leftComponent?: ReactNode
  /**
   * The style of left component of the Header
   */
  leftStyle?: StyleProp<ViewStyle>
  /**
   * The center component of the Header, will replace Title
   */
  centerComponent?: ReactNode
  /**
   * The style of center component of the Header
   */
  centerStyle?: StyleProp<ViewStyle>
  /**
   * The right component of the Header
   */
  rightComponent?: ReactNode
  /**
   * The style of right component of the Header
   */
  rightStyle?: StyleProp<ViewStyle>
}

const Header: React.FC<HeaderProps> = ({
  paddingTop,
  height,
  containerStyle,
  borderBottomWidth,
  borderBottomColor,
  title,
  titleColor,
  titleStyle,
  backgroundColor,
  hasBackButton = true,
  backIconColor,
  backButtonPress,
  leftComponent,
  leftStyle,
  centerComponent,
  centerStyle,
  rightComponent,
  rightStyle,
}) => {
  const HeaderTheme = useTheme().components.Header
  return (
    <Container
      backgroundColor={backgroundColor ?? HeaderTheme.backgroundColor}
      height={(height ?? (HeaderTheme.height as number)) + (paddingTop ?? (HeaderTheme.paddingTop as number))}
      paddingTop={paddingTop ?? HeaderTheme.paddingTop}
      borderBottomWidth={borderBottomWidth ?? HeaderTheme.borderBottomWidth}
      borderBottomColor={borderBottomColor ?? HeaderTheme.borderBottomColor}
      {...StyleSheet.flatten(containerStyle)}>
      <SidesContainer {...StyleSheet.flatten(leftStyle)}>
        {leftComponent
          ? leftComponent
          : hasBackButton && (
              <TouchableOpacity hitSlop={hitSlop} onPress={() => backButtonPress?.()}>
                <IconBack
                  source={Images.chevronLeft}
                  resizeMode="contain"
                  tintColor={backIconColor ?? HeaderTheme.backIconColor}
                />
              </TouchableOpacity>
            )}
      </SidesContainer>

      <TitleContainer {...StyleSheet.flatten(centerStyle)}>
        {centerComponent
          ? centerComponent
          : !!title && (
              <TextBold
                color={titleColor ?? HeaderTheme.titleColor}
                style={titleStyle ?? HeaderTheme.titleStyle}
                numberOfLines={1}>
                {title}
              </TextBold>
            )}
      </TitleContainer>

      <SidesContainer {...StyleSheet.flatten(rightStyle)}>
        {!!rightComponent && rightComponent}
      </SidesContainer>
    </Container>
  )
}

const Container = styled.View((style: ViewStyle) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: metrics.small,
  ...style,
}))

const SidesContainer = styled.View((style: ViewStyle) => ({
  flex: 1,
  justifyContent: 'center',
  ...style,
}))

const TitleContainer = styled.View((style: ViewStyle) => ({
  flex: 4,
  justifyContent: 'center',
  alignItems: 'center',
  ...style,
}))

const IconBack = styled.Image(({tintColor}: ImageStyle) => ({
  height: metrics.large,
  aspectRatio: 1,
  tintColor,
}))

export default Header
