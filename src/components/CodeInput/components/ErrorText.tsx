import React from 'react'
import type {TextProps} from 'react-native'
import styled from 'styled-components/native'

interface ErrorTextProps {
  errorText?: string
  errorProps?: TextProps
}

export const ErrorText: React.FC<ErrorTextProps> = ({errorText, errorProps}) => (
  <ErrorTextStyled {...errorProps}>{errorText}</ErrorTextStyled>
)

const ErrorTextStyled = styled.Text(({theme}) => ({
  fontSize: theme?.fontSizes?.['2xs'],
  color: theme?.colors?.errorText,
  marginTop: theme?.spacing?.tiny,
}))
