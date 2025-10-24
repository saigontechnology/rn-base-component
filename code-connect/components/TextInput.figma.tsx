import React from 'react'
import figma from '@figma/code-connect'
import {Icon, TextInput, theme} from 'rn-base-component'
import {StyleSheet} from 'react-native'

const TEXT_INPUT_FIGMA_URL = '<FIGMA_TEXT_INPUT>'
const SEARCH_INPUT_FIGMA_URL = '<FIGMA_SEARCH_INPUT>'

const styles = StyleSheet.create({
  errorTextProps: {
    color: theme.colors.error,
  },
  helperTextProps: {
    color: theme.colors.gray,
  },
})

const textInputProps = {
  label: figma.boolean('label', {
    true: figma.string('label_value'),
    false: undefined,
  }),
  placeholder: figma.boolean('placeholder', {
    true: figma.string('placeholder_value'),
    false: undefined,
  }),
  isRequire: figma.boolean('required'),
  value: figma.string('label_value'),
  editable: figma.enum('state', {
    default: true,
    active: true,
    disabled: false,
    error: true,
  }),
  rightComponent: figma.boolean('trailing_icon', {
    true: <Icon source={require('@/assets/images/trailing_icon.png')} />,
    false: undefined,
  }),
  errorText: figma.boolean('helper_text', {
    true: figma.string('helper_text_value'),
    false: undefined,
  }),
  errorProps: figma.enum('state', {
    default: {
      style: styles.helperTextProps,
    },
    active: {
      style: styles.helperTextProps,
    },
    disabled: {
      style: styles.helperTextProps,
    },
    error: {
      style: styles.errorTextProps,
    },
  }),
  onFocus: () => {
    /* TODO: Handle onFocus */
  },
  onBlur: () => {
    /* TODO: Handle onBlur */
  },
  onChangeText: () => {
    /* TODO: Handle onChangeText */
  },
}

const searchInputProps = {
  placeholder: figma.textContent('Search'),
  leftComponent: <Icon source={require('@/assets/images/search.png')} />,
  rightComponent: figma.boolean('voice_control', {
    true: <Icon source={require('@/assets/images/voice_control.png')} />,
    false: undefined,
  }),
  onFocus: () => {
    /* TODO: Handle onFocus */
  },
  onBlur: () => {
    /* TODO: Handle onBlur */
  },
  onChangeText: () => {
    /* TODO: Handle onChangeText */
  },
}

figma.connect(TextInput, TEXT_INPUT_FIGMA_URL, {
  variant: {style: 'filled'},
  props: textInputProps,
  example: props => <TextInput {...props} />,
})

figma.connect(TextInput.Flat, TEXT_INPUT_FIGMA_URL, {
  variant: {style: 'floating'},
  props: textInputProps,
  example: props => <TextInput.Flat {...props} />,
})

figma.connect(TextInput.Outlined, TEXT_INPUT_FIGMA_URL, {
  variant: {style: 'outline'},
  props: textInputProps,
  example: props => <TextInput.Outlined {...props} />,
})

figma.connect(TextInput, SEARCH_INPUT_FIGMA_URL, {
  props: searchInputProps,
  example: props => <TextInput {...props} />,
})
