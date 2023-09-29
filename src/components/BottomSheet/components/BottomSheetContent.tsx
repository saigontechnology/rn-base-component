import React, {memo} from 'react'
import {View} from 'react-native'
import type {ITheme} from 'src/theme'
import styled from 'styled-components/native'
import type {BottomSheetContentProps} from '../BottomSheetContent/types'

const Container = styled(View)<{theme: ITheme}>(({theme}) => ({
  padding: theme?.sizes?.petite,
}))

export interface BottomSheetContentProps {
  // styles
  style?: StyleProp<ViewStyle>

  // components
  children?: React.ReactNode
}

const BottomSheetContentComponent: React.FC<BottomSheetContentProps> = ({style, children}) => (
  <Container style={style}>{children}</Container>
)

const BottomSheetContent = memo(BottomSheetContentComponent)
BottomSheetContent.displayName = 'BottomSheetContent'

export default BottomSheetContent
