import React from 'react'
import styled from 'styled-components/native'
import type {TextProps, TextStyle} from 'react-native'

const StyledText = styled.Text<Omit<TypographyProps, 'variant'>>(({theme, color}) => ({
  flexShrink: 1,
  color: color ?? theme.colors?.darkText,
}))
/**
 * Enumeration of typography variants.
 *
 * @typedef {('h1' | 'h2' | 'regular' | 'bold')} TypographyVariant
 */
export type TypographyVariant = 'h1' | 'h2' | 'regular' | 'bold'
type TypographyVariantStyles = {
  // If you wish to add fontFamily, please do it here.
  // Ex: fontFamily: 'Roboto-Bold' | 'Roboto-Regular' | 'Roboto-SemiBold'
} & TextStyle

type TypographyProps = {
  color?: string
  variant?: TypographyVariant
} & TextProps

/**
 * Mapping of typography variant styles to TextStyle objects.
 *
 * @constant
 * @type {Record<TypographyVariant, TypographyVariantStyles>}
 */
// TODO: I think this one should be moved to custom components themes
export const typographyVariantStyles: Record<TypographyVariant, TypographyVariantStyles> = {
  h1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 32,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
  regular: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
  },
}

/**
 * Typography component that renders styled text elements based on the provided typography variant.
 *
 * @component
 * @param {TypographyProps} props - The properties of the Typography component.
 * @param {TypographyVariant} [props.variant='regular'] - The typography variant that defines the text style.
 * @param {string} [props.color] - The color of the text.
 * @param {...TextProps} [props.rest] - Additional text properties that can be passed down to the underlying `StyledText` component.
 * @returns {JSX.Element} The styled text element.
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = 'regular',
  style,
  ...rest
}: TypographyProps): JSX.Element => {
  const styles = typographyVariantStyles[variant]
  return (
    <StyledText
      style={[
        {
          ...styles,
          ...(typeof style === 'object' ? style : {}),
        },
      ]}
      {...rest}
    />
  )
}
