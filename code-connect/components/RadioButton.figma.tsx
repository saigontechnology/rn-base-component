import React from 'react'
import figma from '@figma/code-connect'
import {RadioButton, theme, Typography} from 'rn-base-component'
import {metrics} from 'src/helpers'
import {StyleSheet, View} from 'react-native'

const RADIO_BUTTON_FIGMA_URL = '<FIGMA_RADIO_BUTTON>'
const HORIZONTAL_RADIO_BUTTONS_FIGMA_URL = '<FIGMA_HORIZONTAL_RADIO_BUTTONS>'
const VERTICAL_RADIO_BUTTONS_FIGMA_URL = '<FIGMA_VERTICAL_RADIO_BUTTONS>'

const styles = StyleSheet.create({
  labelText: {
    fontSize: metrics.small,
    color: theme.colors.gray,
  },
  requiredAsterisk: {
    color: theme.colors.error,
    fontSize: metrics.small,
    fontWeight: 'bold',
  },
  verticalWrapper: {
    flexDirection: 'column',
  },
  horizontalWrapper: {
    flexDirection: 'row',
  },
})

const radioButtonProps = {
  value: figma.enum('state', {
    checked: true,
    disabled: false,
    default: false,
  }),
  label: figma.boolean('label', {
    true: figma.string('label_text'),
    false: undefined,
  }),
  disabled: figma.enum('state', {
    disabled: true,
  }),
  outerSize: metrics.medium,
  innerSize: metrics.small,
  ringColor: theme.colors.gray,
  innerBackgroundColor: theme.colors.primary,
  wrapperStyle: figma.enum('type', {
    horizontal: undefined,
    vertical: styles.verticalWrapper,
  }),
  onPressButton: () => {
    /* TODO: Handle onPressButton */
  },
}

figma.connect(RadioButton, RADIO_BUTTON_FIGMA_URL, {
  props: radioButtonProps,
  example: props => <RadioButton {...props} />,
})

// label with required asterisk
figma.connect(RadioButton, RADIO_BUTTON_FIGMA_URL, {
  variant: {required: true, label: true},
  props: radioButtonProps,
  example: ({label, ...props}) => (
    <RadioButton
      {...props}
      textComponent={
        <Typography style={styles.labelText}>
          {label}
          <Typography style={styles.requiredAsterisk}> *</Typography>
        </Typography>
      }
    />
  ),
})

// horizontal layout with required asterisk
figma.connect(RadioButton, HORIZONTAL_RADIO_BUTTONS_FIGMA_URL, {
  props: {
    alignmentStyle: figma.enum('alignment', {
      horizontal: styles.horizontalWrapper,
      vertical: styles.verticalWrapper,
    }),
    radioButtons: figma.children('radio_button'),
  },
  example: ({alignmentStyle, radioButtons}) => <View style={alignmentStyle}>{radioButtons}</View>,
})

// vertical layout with required asterisk
figma.connect(RadioButton, VERTICAL_RADIO_BUTTONS_FIGMA_URL, {
  props: {
    radioButtons: figma.children('radio_button'),
  },
  example: ({radioButtons}) => <View style={styles.horizontalWrapper}>{radioButtons}</View>,
})
