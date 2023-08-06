import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Progress} from 'rn-base-component'
import {StyleSheet, View} from 'react-native'
import {metrics} from '../../../src/helpers'

export default {
  title: 'components/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>

export const Basic: ComponentStory<typeof Progress> = args => (
  <>
    <View style={styles.container}>
      <Progress {...args} />
    </View>
    <View style={styles.container}>
      <Progress {...args} isIndeterminateProgress />
    </View>
  </>
)

Basic.args = {
  value: 20,
  filledTrackColor: '#49BE25',
  backgroundColor: '#E5E5E5',
  borderRadius: 8,
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: metrics.marginVertical,
    paddingHorizontal: metrics.paddingHorizontal,
  },
})
