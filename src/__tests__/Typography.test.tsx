import React from 'react'
import {render} from '@testing-library/react-native'
import {Typography, typographyVariantStyles} from '../components'
import {BaseProvider} from '../core'

describe('Typography Component', () => {
  it('renders text with default style and variant', () => {
    const {getByText} = render(
      <BaseProvider>
        <Typography>Test Text</Typography>
      </BaseProvider>,
    )
    const textElement = getByText('Test Text')

    // Verify default variant is 'regular'
    const regularStyle = typographyVariantStyles.regular
    expect(textElement).toHaveStyle(regularStyle)
  })

  it('applies the specified typography variant style', () => {
    const {getByText} = render(
      <BaseProvider>
        <Typography variant="h1">Test Text</Typography>
      </BaseProvider>,
    )
    const textElement = getByText('Test Text')

    // Verify variant style is applied
    const h1Style = typographyVariantStyles.h1
    expect(textElement).toHaveStyle(h1Style)
  })

  it('applies custom style', () => {
    const customStyle = {fontSize: 20, color: 'red'}
    const {getByText} = render(
      <BaseProvider>
        <Typography style={customStyle}>Test Text</Typography>
      </BaseProvider>,
    )
    const textElement = getByText('Test Text')

    // Verify custom style is applied
    expect(textElement).toHaveStyle(customStyle)
  })

  it('applies specified color', () => {
    const customColor = 'blue'
    const {getByText} = render(
      <BaseProvider>
        <Typography color={customColor}>Test Text</Typography>
      </BaseProvider>,
    )
    const textElement = getByText('Test Text')

    // Verify color is applied
    expect(textElement).toHaveStyle({color: customColor})
  })

  it('renders text correctly', () => {
    const {getByText} = render(
      <BaseProvider>
        <Typography>Test Text</Typography>
      </BaseProvider>,
    )
    const textElement = getByText('Test Text')

    // Verify text is rendered correctly
    expect(textElement).toBeTruthy()
  })
})
