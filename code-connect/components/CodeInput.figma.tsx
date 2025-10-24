import React from 'react'
import figma from '@figma/code-connect'
import {CodeInput, Icon} from 'rn-base-component'

const CODE_INPUTS_FIGMA_URL = '<FIGMA_CODE_INPUTS>'

const codeInputProps = {
  length: 6,
  label: figma.boolean('label', {
    true: figma.string('label_value'),
    false: undefined,
  }),
  error: figma.enum('state', {
    error: true,
    enabled: false,
    success: false,
  }),
  errorText: figma.enum('state', {
    error: figma.textContent('feedback_text'),
    enabled: undefined,
    success: undefined,
  }),
  success: figma.enum('state', {
    success: true,
    enabled: false,
    error: false,
  }),
  helperText: figma.enum('state', {
    success: figma.textContent('feedback_text'),
    enabled: undefined,
    error: undefined,
  }),
  rightComponent: figma.boolean('success_icon', {
    true: <Icon source={require('@/assets/images/success_icon.png')} />,
    false: figma.enum('state', {
      error: <Icon source={require('@/assets/images/error_icon.png')} />,
      enabled: undefined,
      success: undefined,
    }),
  }),
  placeholderAsDot: true,
  withCursor: true,
  secureTextEntry: true,
  autoFocus: true,
  onChangeText: () => {
    /* TODO: Handle onChangeText */
  },
  onSubmit: () => {
    /* TODO: Handle onSubmit */
  },
  onClear: () => {
    /* TODO: Handle onClear */
  },
}

figma.connect(CodeInput, CODE_INPUTS_FIGMA_URL, {
  props: codeInputProps,
  example: props => <CodeInput {...props} />,
})
