import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Text} from 'rn-base-component'
import {StyleSheet, View} from 'react-native'

export default {
  title: 'Text',
  component: Text,
} as ComponentMeta<typeof Text>

export const BaseText: ComponentStory<typeof Text> = args => (
  <View style={styles.container}>
    <Text.Bold style={styles.textContainer} {...args}>
      Text Bold
    </Text.Bold>
    <Text.Underline style={styles.textContainer} {...args}>
      Text Underline
    </Text.Underline>
    <Text.Title style={styles.textContainer} {...args}>
      Text Title
    </Text.Title>
    <Text.Span style={styles.textContainer} {...args}>
      Text Span
    </Text.Span>
  </View>
)

BaseText.args = {
  children: 'Component Base Text!',
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  textContainer: {
    marginBottom: 12,
  },
})
