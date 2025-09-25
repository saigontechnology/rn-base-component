import React, {PropsWithChildren} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import styled from 'styled-components/native'
import {activeOpacity} from '../../helpers'
import {useTheme} from '../../hooks'

export interface CardProps extends PropsWithChildren {
  /**
   * handle press on card
   */
  onPress?: () => void

  /**
   * style for card
   */
  style?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>

  /**
   * padding inside the card
   */
  padding?: number

  /**
   * border radius for the card
   */
  borderRadius?: number

  /**
   * background color of the card
   */
  backgroundColor?: string
}

export const Card: React.FC<CardProps> = ({
  onPress,
  style,
  children,
  padding,
  borderRadius,
  backgroundColor,
}) => {
  const CardTheme = useTheme().components.Card

  return (
    <CardWrapper
      onPress={onPress}
      activeOpacity={onPress ? activeOpacity.low : activeOpacity.none}
      style={style}
      padding={padding ?? CardTheme.padding}
      borderRadius={borderRadius ?? CardTheme.borderRadius}
      backgroundColor={backgroundColor ?? CardTheme.backgroundColor}
      testID={'card'}>
      {children}
    </CardWrapper>
  )
}

const CardWrapper = styled.TouchableOpacity<{
  padding: number
  borderRadius: number
  backgroundColor: string
}>(({padding, borderRadius, backgroundColor}) => ({
  padding,
  borderRadius,
  backgroundColor,
}))
