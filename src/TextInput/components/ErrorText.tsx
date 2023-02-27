import React from 'react'
import {Text, TextProps} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../../helpers/colors'

interface ErrorTextProps {
  errorText?: string
  errorProps?: TextProps
}

export const Error: React.FC<ErrorTextProps> = ({errorText, errorProps}) => (
  <ErrorText as={Text} {...errorProps}>
    {errorText}
  </ErrorText>
)

const ErrorText = styled.Text`
  font-size: 14px;
  color: ${colors.red};
`
