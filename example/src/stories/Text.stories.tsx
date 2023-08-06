import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Text, TextBold, TextItalic} from 'rn-base-component'
import {StyleSheet, View} from 'react-native'
import {metrics} from '../../../src/helpers'

export default {
  title: 'Text',
  component: Text,
} as ComponentMeta<typeof Text>

export const BaseText: ComponentStory<typeof Text> = () => (
  <View style={styles.container}>
    <Text style={styles.textContainer} fontSize={metrics.title}>
      Text font normal
    </Text>
    <TextBold style={styles.textContainer} fontSize={metrics.title}>
      Text font bold
    </TextBold>
    <TextItalic style={styles.textContainer} fontSize={metrics.title}>
      Text font italic
    </TextItalic>
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingVertical: metrics.marginVertical,
    paddingHorizontal: metrics.paddingHorizontal,
  },
  textContainer: {
    marginBottom: metrics.small,
  },
})
