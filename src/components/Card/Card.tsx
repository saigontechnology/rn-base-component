import React, {PropsWithChildren} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import styled from 'styled-components/native'
import {activeOpacity, metrics} from '../../helpers'

export interface CardProps extends PropsWithChildren {
  /**
   * handle press on card
   */
  onPress?: () => void

  /**
   * style for card
   */
  style?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
}

const Card: React.FC<CardProps> = ({onPress, style, children}) => (
  <CardWrapper
    onPress={onPress}
    activeOpacity={onPress ? activeOpacity.low : activeOpacity.none}
    style={style}
    testID={'card'}>
    {children}
  </CardWrapper>
)

const CardWrapper = styled.TouchableOpacity(({theme}) => ({
  padding: theme.spacing.slim,
  borderRadius: metrics.borderRadius,
  backgroundColor: theme.colors.cardBackground,
}))

export default Card
