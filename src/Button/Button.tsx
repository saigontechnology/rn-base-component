import React from 'react'
import {
  ImageResizeMode,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicatorProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextProps,
  ImageSourcePropType,
  ImageStyle,
  TouchableOpacityProps,
} from 'react-native'
import {colors} from '../helpers/colors'
import {metrics, responsiveFont} from '../helpers/metrics'
import {Icon} from '../Icon/Icon'
import styled from 'styled-components/native'

type IconPosition = 'left' | 'right' | 'top' | 'bottom'
type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse'

export interface IButtonProps extends TouchableOpacityProps {
  /** Add button title */
  title?: string | React.ReactElement

  /** Add additional styling for title component */
  titleStyle?: StyleProp<TextStyle>

  /** Add additional props for Text component */
  titleProps?: TextProps

  /** Add additional styling for button component */
  buttonStyle?: StyleProp<ViewStyle>

  /** Prop to display a loading spinner */
  loading?: boolean

  /** Add additional styling for loading component */
  loadingStyle?: StyleProp<ViewStyle>

  /** Displays a centered icon (when no title) or to the left (with text). (can be used along with iconPosition as well) */
  iconSource?: ImageSourcePropType

  /** Styling for Icon Component container */
  iconContainerStyle?: StyleProp<ImageStyle>

  /** Radius of button */
  radius?: number

  /** Displays Icon to the position mentioned. Needs to be used along with `iconSource` prop */
  iconPosition?: IconPosition

  /** Displays Icon size need to be used along with `iconSource` prop */
  iconSize?: number

  /** Displays Icon color need to be used along with `iconSource` prop */
  iconColor?: string

  /** Determines how to resize the image when the frame doesn't match the raw */
  resizeMode?: ImageResizeMode

  /** Add additional props for ActivityIndicator component. */
  loadingProps?: ActivityIndicatorProps

  /** Style of the title when disabled. */
  disabledTitleStyle?: StyleProp<TextStyle>

  /** Style of the view when disabled. */
  disabledStyle?: StyleProp<ViewStyle>

  /** Uppercase button title*/
  uppercase?: boolean

  /** Styling for Component container. */
  containerStyle?: StyleProp<ViewStyle>
}

interface ButtonContentProps {
  disabled: boolean
  iconPosition: FlexDirection
  style: StyleProp<ViewStyle>
}

interface StyledText extends TextProps {
  uppercase: boolean
  disabled: boolean
  style: StyleProp<TextStyle>
}

type ContainerProps = {
  radius: number
}

const iconPositionStyle = {
  top: 'column',
  bottom: 'column-reverse',
  left: 'row',
  right: 'row-reverse',
}

export const Button: React.FunctionComponent<IButtonProps> = ({
  title = '',
  titleStyle: buttonTitleStyle,
  titleProps,
  buttonStyle,
  loading = false,
  loadingProps: buttonLoadingProps,
  loadingStyle,
  iconSource,
  iconContainerStyle,
  radius = 0,
  iconPosition = 'left',
  iconSize = metrics.xxl,
  iconColor,
  disabled = false,
  resizeMode = 'contain',
  disabledTitleStyle,
  disabledStyle,
  uppercase = false,
  activeOpacity = 0.2,
  containerStyle,
  onPress = () => {},
  onLongPress = () => {},
  ...rest
}) => {
  return (
    <Container radius={radius} style={containerStyle}>
      <TouchableOpacity
        testID="test-button"
        disabled={disabled || loading}
        activeOpacity={activeOpacity}
        onPress={onPress}
        onLongPress={onLongPress}
        {...rest}>
        <ButtonContent
          style={[buttonStyle, !!disabled && disabledStyle]}
          iconPosition={iconPositionStyle[iconPosition] as FlexDirection}
          disabled={disabled}>
          {/* Activity Indicator on loading */}
          {!!loading && (
            <Loading
              testID={'test-loading'}
              style={loadingStyle}
              color={buttonLoadingProps?.color || 'black'}
              size={buttonLoadingProps?.size || 'small'}
              {...buttonLoadingProps}
            />
          )}
          {/* Button Icon, hide Icon while loading */}
          {!loading && iconSource && (
            <IconContainer
              testID="test-icon"
              source={iconSource}
              size={iconSize}
              color={iconColor}
              style={iconContainerStyle}
              resizeMode={resizeMode}
            />
          )}
          {/* Title for Button, hide while loading */}
          {!loading ? (
            typeof title === 'string' ? (
              <Title
                testID="test-title"
                style={StyleSheet.flatten([buttonTitleStyle, !!disabled && disabledTitleStyle])}
                disabled={disabled}
                uppercase={uppercase}
                as={Text}
                {...titleProps}>
                {title}
              </Title>
            ) : (
              title
            )
          ) : null}
        </ButtonContent>
      </TouchableOpacity>
    </Container>
  )
}

const Container = styled.View<ContainerProps>(props => ({
  overflow: 'hidden',
  borderRadius: props.radius || 0,
}))

const ButtonContent = styled.View<ButtonContentProps>(props => ({
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: metrics.xs,
  paddingHorizontal: metrics.xs,
  backgroundColor: colors.primary,
  flexDirection: props.iconPosition,
  opacity: props.disabled ? 0.5 : 1,
}))

const Title = styled.Text<StyledText>(props => ({
  fontSize: responsiveFont(16),
  textAlign: 'center',
  textTransform: props.uppercase ? 'uppercase' : 'none',
  opacity: props.disabled ? 0.5 : 1,
}))

const Loading = styled.ActivityIndicator({
  marginVertical: 2,
})

const IconContainer = styled(Icon)({
  margin: metrics.xxs,
})
