import React from 'react'
import {SafeAreaView, StyleSheet, Text} from 'react-native'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {CodeInput} from 'rn-base-component'

export default {
  title: 'components/CodeInput',
  component: CodeInput,
} as ComponentMeta<typeof CodeInput>

export const Basic: ComponentStory<typeof CodeInput> = () => (
  <SafeAreaView style={styles.root}>
    <Text>SecureTextEntry</Text>
    <CodeInput focusCellStyle={styles.focusCellStyle} secureTextEntry />
    <Text>Normal</Text>
    <CodeInput length={4} focusCellStyle={styles.focusCellStyle} />
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
