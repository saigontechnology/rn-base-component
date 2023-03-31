import React from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {RnCodeInput} from 'rn-base-component'

export default {
  title: 'components/CodeInput',
  component: RnCodeInput,
} as ComponentMeta<typeof RnCodeInput>

export const Basic: ComponentStory<typeof RnCodeInput> = () => (
  <SafeAreaView style={styles.root}>
    <RnCodeInput cellStyle={styles.cellStyle} focusCellStyle={styles.focusCellStyle} />
    <RnCodeInput cellCount={4} cellStyle={styles.cellStyle} focusCellStyle={styles.focusCellStyle} />
  </SafeAreaView>
)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellStyle: {
    borderColor: '#d5d5d5',
  },
  focusCellStyle: {
    backgroundColor: '#e5e5e5',
    borderColor: '#d5d5d5',
  },
})
