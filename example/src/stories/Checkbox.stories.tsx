import React from 'react'
import {StyleSheet, View} from 'react-native'
import type {ComponentMeta, ComponentStory} from '@storybook/react'
import {RnBaseCheckbox} from 'rn-base-component'

export default {
  title: 'components/Checkbox',
  component: RnBaseCheckbox,
} as ComponentMeta<typeof RnBaseCheckbox>

export const Basic: ComponentStory<typeof RnBaseCheckbox> = () => (
  <View style={styles.container}>
    <RnBaseCheckbox size={25} fillColor="#562B69" />
    <View style={styles.spacer} />
    <RnBaseCheckbox size={25} fillColor="green" text="checkbox label" />
    <View style={styles.spacer} />
    <RnBaseCheckbox size={25} fillColor="green" disable={true} text="disable checkbox" />
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
