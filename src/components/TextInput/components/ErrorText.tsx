import React from 'react'
import styled from 'styled-components/native'
import type {TextProps} from 'react-native'

interface ErrorTextProps {
  errorText?: string
  errorProps?: TextProps
}

export const Error: React.FC<ErrorTextProps> = ({errorText, errorProps}) => (
  <ErrorText {...errorProps}>{errorText}</ErrorText>
)

const ErrorText = styled.Text(({theme}) => ({
  fontSize: theme?.fontSizes?.['2xs'],
  color: theme?.colors?.errorText,
}))
