import React from 'react'
import {Text, TextProps} from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../../helpers/colors'
import {responsiveFont} from '../../helpers/metrics'

interface ErrorTextProps {
  errorText?: string
  errorProps?: TextProps
}

export const Error: React.FC<ErrorTextProps> = ({errorText, errorProps}) => (
  <ErrorText as={Text} {...errorProps}>
    {errorText}
  </ErrorText>
)

const ErrorText = styled.Text({
  fontSize: responsiveFont(14),
  color: colors.red,
})
