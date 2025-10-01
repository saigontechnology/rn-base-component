import React from 'react'
import figma from '@figma/code-connect'
import {Progress, theme, Typography} from 'rn-base-component'
import {metrics} from 'src/helpers'
import {StyleSheet, View} from 'react-native'

const PROGRESS_LINEAR_FIGMA_URL = '<FIGMA_PROGRESS_LINEAR>'

figma.connect(Progress, PROGRESS_LINEAR_FIGMA_URL, {
  props: {
    value: 75,
    borderRadius: metrics.small,
    filledTrackColor: theme.colors.primary,
    backgroundColor: theme.colors.gray,
    width: 400,
    // Defines progress mode
    isIndeterminateProgress: true,
  },
  example: props => <Progress {...props} />,
})

// Example Progress with label text
figma.connect(Progress, PROGRESS_LINEAR_FIGMA_URL, {
  variant: {progress_label: true},
  props: {
    label: figma.string('progress_label_text'),
    value: 75,
    borderRadius: metrics.small,
    filledTrackColor: theme.colors.primary,
    backgroundColor: theme.colors.gray,
    width: 400,
    isIndeterminateProgress: true,
  },
  example: ({label, ...progressProps}) => (
    <View style={styles.container}>
      <Progress {...progressProps} />
      <Typography variant="regular">{label}</Typography>
    </View>
  ),
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: metrics.small,
  },
})
