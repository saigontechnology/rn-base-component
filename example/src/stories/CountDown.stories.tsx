import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'
import {theme, CountDown} from 'rn-base-component'
import {ScrollView, StyleSheet, View} from 'react-native'
import {metrics} from '../../../src/helpers'

export default {
  title: 'components/CountDown',
  component: CountDown,
} as ComponentMeta<typeof CountDown>

export const CountDownComponent: ComponentStory<typeof CountDown> = args => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.marginBottom} />
    <CountDown {...args} />
  </ScrollView>
)
CountDownComponent.args = {
  initialSeconds: 10,
  loop: false,
  format: 'mmss',
}

const styles = StyleSheet.create({
  spacingTop: {
    marginVertical: metrics.borderRadiusLarge,
  },
  background: {
    backgroundColor: '#e6e0ec',
  },
  marginBottom: {
    marginBottom: metrics.xxl,
  },
  CountDownContainer: {
    marginHorizontal: metrics.medium,
  },
  inputContainer: {
    borderWidth: theme?.borderWidths.tiny,
    borderRadius: metrics.borderRadius,
    paddingHorizontal: metrics.xs,
    height: metrics.xxxl,
  },
})
