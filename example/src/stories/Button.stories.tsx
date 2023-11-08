import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Button, ButtonOutline, ButtonPrimary, ButtonSecondary, ButtonTransparent} from 'rn-base-component'
import {StyleSheet, View} from 'react-native'

export default {
  title: 'components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

export const Basic: ComponentStory<typeof Button> = args => (
  <View style={styles.container}>
    <Button {...args} />
    <View style={styles.spacer} />
    <Button {...args} text="Disable me!" disabled />
    <View style={styles.spacer} />
    <ButtonOutline {...args} text="I'm an outline button" />
    <View style={styles.spacer} />
    <ButtonPrimary {...args} text="I'm a primary button" />
    <View style={styles.spacer} />
    <ButtonSecondary {...args} text="I'm a primary button" />
    <View style={styles.spacer} />
    <ButtonTransparent {...args} text="I'm a primary button" />
  </View>
)

Basic.args = {
  text: 'Hello STS Team!',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  spacer: {
    marginVertical: 10,
  },
})
