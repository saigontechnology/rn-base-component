import React from 'react'
import type {LayoutChangeEvent, StyleProp, ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import type {ITheme} from '../../../theme'

interface ITrack {
  style?: StyleProp<ViewStyle>
  onLayout?: (event: LayoutChangeEvent) => void
}

const Track: React.FC<ITrack> = ({style, onLayout}) => (
  <TrackAnimatedComponent style={style} onLayout={onLayout} />
)

const TrackComponent = styled.View(({theme}: {theme: ITheme}) => ({
  flex: 1,
  borderRadius: theme.borderWidths?.huge,
  backgroundColor: theme?.colors?.backgroundPrimary,
}))

const TrackAnimatedComponent = Animated.createAnimatedComponent<ITrack>(TrackComponent)

export {Track}
