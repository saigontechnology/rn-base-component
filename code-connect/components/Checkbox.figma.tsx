import React from 'react'
import figma from '@figma/code-connect'
import {Checkbox, theme, Typography} from 'rn-base-component'
import {StyleSheet, View} from 'react-native'
import {metrics} from 'src/helpers'

const CHECKBOX_FIGMA_URL = '<FIGMA_CHECKBOX>'
const CHECKBOXES_FIGMA_URL = '<FIGMA_CHECKBOXES>'

const checkboxProps = {
  isChecked: figma.boolean('checked'),
  label: figma.boolean('label', {
    true: figma.string('label_text'),
    false: undefined,
  }),
  disabled: figma.enum('state', {
    disabled: true,
  }),
  fillColor: theme.colors.primary,
  unfillColor: theme.colors.transparent,
  checkMarkColor: theme.colors.white,
  disabledText: theme.colors.gray,
  borderRadius: metrics.borderRadius,
  onChange: () => {
    /* TODO: Handle onChange */
  },
}

figma.connect(Checkbox, CHECKBOX_FIGMA_URL, {
  props: checkboxProps,
  example: props => <Checkbox {...props} />,
})

figma.connect(Checkbox, CHECKBOX_FIGMA_URL, {
  variant: {required: true},
  props: checkboxProps,
  example: ({label, ...props}) => (
    <Checkbox
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

figma.connect(Checkbox, CHECKBOXES_FIGMA_URL, {
  props: {
    checkboxes: figma.children('checkbox'),
  },
  example: ({checkboxes}) => <View style={styles.container}>{checkboxes}</View>,
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: metrics.medium,
  },
  labelText: {
    fontSize: metrics.small,
    color: theme.colors.gray,
  },
  requiredAsterisk: {
    color: theme.colors.error,
    fontSize: metrics.small,
    fontWeight: 'bold',
  },
})
