import React, {ReactNode} from 'react'
import type {TextProps} from 'react-native'
import styled from 'styled-components/native'

interface HelperTextProps {
  helperText?: string
  helperComponent?: ReactNode
  helperTextProps?: TextProps
}

export const HelperText: React.FC<HelperTextProps> = ({helperText, helperComponent, helperTextProps}) => {
  // Prioritize custom component over text
  if (helperComponent) {
    return <HelperContainer>{helperComponent}</HelperContainer>
  }

  // Fall back to text rendering
  return <HelperTextStyled {...helperTextProps}>{helperText}</HelperTextStyled>
}

const HelperContainer = styled.View(({theme}) => ({
  marginTop: theme?.spacing?.tiny,
}))

const HelperTextStyled = styled.Text(({theme}) => ({
  fontSize: theme?.fontSizes?.['2xs'],
  color: theme?.colors?.gray,
  marginTop: theme?.spacing?.tiny,
}))
