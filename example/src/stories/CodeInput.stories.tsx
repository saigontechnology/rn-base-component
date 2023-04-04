import React from 'react'
import {SafeAreaView, StyleSheet, Text} from 'react-native'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {RnCodeInput} from 'rn-base-component'

export default {
  title: 'components/CodeInput',
  component: RnCodeInput,
} as ComponentMeta<typeof RnCodeInput>

export const Basic: ComponentStory<typeof RnCodeInput> = () => (
  <SafeAreaView style={styles.root}>
    <Text>SecureTextEntry</Text>
    <RnCodeInput focusCellStyle={styles.focusCellStyle} secureTextEntry />
    <Text>Normal</Text>
    <RnCodeInput cellCount={4} focusCellStyle={styles.focusCellStyle} />
  </SafeAreaView>
)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusCellStyle: {
    backgroundColor: '#7AA874',
  },
})
