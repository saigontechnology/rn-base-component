import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Button} from 'rn-base-component'
import {StyleSheet, View} from 'react-native'

export default {
  title: 'components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

export const Basic: ComponentStory<typeof Button> = args => (
  <View style={styles.container}>
    <Button {...args} />
    <View style={styles.spacer} />
    <Button
      {...args}
      text="I'm an outline button"
      textColor="black"
      outline
      outlineColor="black"
      outlineWidth={2}
      backgroundColor="transparent"
    />
    <View style={styles.spacer} />
    <Button {...args} text="Disable me!" outline outlineWidth={2} disabled />
    <View style={styles.spacer} />
    <Button
      {...args}
      text="I have a border radius"
      outline
      outlineWidth={1}
      borderRadius={12}
      backgroundColor="red"
    />
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
