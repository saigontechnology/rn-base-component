import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {
  Button,
  ButtonOutline,
  ButtonPrimary,
  ButtonSecondary,
  ButtonTransparent,
  Text,
} from 'rn-base-component'
import {StyleSheet, View} from 'react-native'

export default {
  title: 'components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

export const Basic: ComponentStory<typeof Button> = args => (
  <View style={styles.container}>
    <Button {...args} />
    <View style={styles.spacer} />
    <Button {...args} disabled>
      Disable me!
    </Button>
    <View style={styles.spacer} />
    <ButtonOutline {...args}>
      <Text>{"I'm an outline button"}</Text>
      <Text>Description outline</Text>
    </ButtonOutline>
    <View style={styles.spacer} />
    <ButtonPrimary {...args}>{"I'm a primary button"}</ButtonPrimary>
    <View style={styles.spacer} />
    <ButtonSecondary {...args}>{"I'm a secondary button"}</ButtonSecondary>
    <View style={styles.spacer} />
    <ButtonTransparent {...args}>{"I'm a transparent button"}</ButtonTransparent>
  </View>
)

Basic.args = {
  text: 'Hello STS Team!',
  textSize: 30,
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
