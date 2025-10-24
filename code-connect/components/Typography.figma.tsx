import React from 'react'
import figma from '@figma/code-connect'
import {Typography, theme} from 'rn-base-component'

const TYPOGRAPHY_FIGMA_URL = '<FIGMA_TYPOGRAPHY>'

figma.connect(Typography, TYPOGRAPHY_FIGMA_URL, {
  props: {
    children: figma.string('title_text'),
    color: theme.colors.darkText,
  },
  example: props => <Typography {...props} />,
})
