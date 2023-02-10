import React from 'react'
import {
  ImageResizeMode,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicatorProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextProps,
  ImageSourcePropType,
  ImageStyle,
  ActivityIndicator,
} from 'react-native'
import {colors} from '../helpers/colors'
import {metrics} from '../helpers/metrics'
import {Icon} from '../Icon/Icon'
import styled from 'styled-components/native'

export interface IButtonProps {
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

  /** Disables user interaction. */
  disabled?: boolean

  /** Determines what the opacity of the wrapped view should be when touch is active. Default is 0.2 */
  activeOpacity?: number

  /** Radius of button */
  radius?: number

  /** Displays Icon to the position mentioned. Needs to be used along with `iconSource` prop */
  iconPosition?: 'left' | 'right' | 'top' | 'bottom'

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

  /** Called when the touch is released */
  onPress?: () => void
  onLongPress?: () => void
}

interface StyledView {
  disabled: boolean
  iconPosition: string
  style: StyleProp<ViewStyle>
}

interface StyledText extends TextProps {
  uppercase: boolean
  disabled: boolean
  style: any
}

/**
 * Button style
 */
const StyledButton = styled.View<StyledView>`
  align-items: center;
  justify-content: center;
  padding-vertical: ${metrics.xs};
  padding-horizontal: ${metrics.xs};
  background-color: colors.primary;
  flex-direction: ${props => props.iconPosition};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`

/**
 * Title style
 */
const StyledTitle = styled.Text<StyledText>`
  font-size: 16;
  text-align: center;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`

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
}) => {
  const iconPositionStyle = {
    top: 'column',
    bottom: 'column-reverse',
    left: 'row',
    right: 'row-reverse',
  }

  return (
    <View style={[styles.buttonContainer, {borderRadius: radius}, containerStyle]}>
      <TouchableOpacity
        disabled={disabled || loading}
        activeOpacity={activeOpacity}
        onPress={onPress}
        onLongPress={onLongPress}>
        <StyledButton
          style={[buttonStyle, !!disabled && disabledStyle]}
          iconPosition={iconPositionStyle[iconPosition]}
          disabled={disabled}>
          {/* Activity Indicator on loading */}
          {!!loading && (
            <ActivityIndicator
              style={[styles.loading, loadingStyle]}
              color={buttonLoadingProps?.color || 'black'}
              size={buttonLoadingProps?.size || 'small'}
              {...buttonLoadingProps}
            />
          )}
          {/* Button Icon, hide Icon while loading */}
          {!loading && iconSource && (
            <Icon
              source={iconSource}
              size={iconSize}
              color={iconColor}
              style={[styles.icon, iconContainerStyle]}
              resizeMode={resizeMode}
            />
          )}
          {/* Title for Button, hide while loading */}
          {!loading ? (
            typeof title === 'string' ? (
              <StyledTitle
                style={StyleSheet.flatten([buttonTitleStyle, !!disabled && disabledTitleStyle])}
                disabled={disabled}
                uppercase={uppercase}
                as={Text}
                {...titleProps}>
                {title}
              </StyledTitle>
            ) : (
              title
            )
          ) : null}
        </StyledButton>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
  },
  loading: {
    marginVertical: 2,
  },
  icon: {
    margin: metrics.xxs,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: metrics.xs,
    paddingHorizontal: metrics.xs,
    backgroundColor: colors.primary,
  },
  disableStyle: {
    opacity: 0.5,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
})
