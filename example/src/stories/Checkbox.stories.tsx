import React from 'react'
import {StyleSheet, View} from 'react-native'
import type {ComponentMeta, ComponentStory} from '@storybook/react'
import {Checkbox} from 'rn-base-component'

export default {
  title: 'components/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

export const Basic: ComponentStory<typeof Checkbox> = () => (
  <View style={styles.container}>
    <Checkbox />
    <View style={styles.spacer} />
    <Checkbox text="checkbox label" />
    <View style={styles.spacer} />
    <Checkbox disabled={true} text="disable checkbox" />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    marginVertical: 10,
  },
})
