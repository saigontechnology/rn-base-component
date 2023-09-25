import React, {memo} from 'react'
import {View} from 'react-native'
import type {ITheme} from 'src/theme'
import styled from 'styled-components/native'
import type {BottomSheetContentProps} from './types'

const Container = styled(View)<{theme: ITheme}>(({theme}) => ({
  padding: theme?.sizes?.petite,
}))

const BottomSheetContentComponent: React.FC<BottomSheetContentProps> = ({style, children}) => (
  <Container style={style}>{children}</Container>
)

const BottomSheetContent = memo(BottomSheetContentComponent)
BottomSheetContent.displayName = 'BottomSheetContent'

export default BottomSheetContent
