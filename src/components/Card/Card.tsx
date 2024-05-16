import React, {PropsWithChildren} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import styled from 'styled-components/native'
import {activeOpacity, metrics} from '../../helpers/metrics'
import type {ITheme} from '../../theme'

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

export const Card: React.FC<CardProps> = ({onPress, style, children}) => (
  <CardWrapper
    onPress={onPress}
    activeOpacity={onPress ? activeOpacity.low : activeOpacity.none}
    style={style}
    testID={'card'}>
    {children}
  </CardWrapper>
)

const CardWrapper = styled.TouchableOpacity((props: {theme: ITheme}) => ({
  padding: props?.theme?.spacing?.slim,
  borderRadius: metrics.borderRadius,
  backgroundColor: props?.theme?.colors?.cardBackground,
}))
