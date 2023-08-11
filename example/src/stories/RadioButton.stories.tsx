import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {RadioButton} from 'rn-base-component'
import {StyleSheet, View} from 'react-native'
import {metrics} from '../../../src/helpers'

export default {
  title: 'components/RadioButton',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>

export const Basic: ComponentStory<typeof RadioButton> = rest => (
  <View style={styles.container}>
    <RadioButton {...rest} />
  </View>
)

Basic.args = {
  text: 'Radio Button',
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: metrics.marginVertical,
    paddingHorizontal: metrics.paddingHorizontal,
  },
})
