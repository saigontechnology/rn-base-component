import React from 'react'
import figma from '@figma/code-connect'
import {CodeInput} from 'rn-base-component'

const CODE_INPUTS_FIGMA_URL = '<FIGMA_CODE_INPUTS>'

const codeInputProps = {
  placeholderAsDot: true,
  withCursor: true,
  secureTextEntry: true,
  onChange: () => {
    /* TODO: Handle onChange */
  },
  onSubmit: () => {
    /* TODO: Handle onSubmit */
  },
  onClear: () => {
    /* TODO: Handle onClear */
  },
}

figma.connect(CodeInput, CODE_INPUTS_FIGMA_URL, {
  props: {
    ...codeInputProps,
    length: figma.children('otp_input').props.length,
  },
  example: props => <CodeInput {...props} />,
})
