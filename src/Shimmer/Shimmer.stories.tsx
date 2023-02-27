// stories/Shimmer.stories.tsx
import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import Shimmer from './Shimmer'

export default {
  title: 'components/Shimmer',
  component: Shimmer,
} as ComponentMeta<typeof Shimmer>

export const Basic: ComponentStory<typeof Shimmer> = args => {
  return (
    <View style={styles.container}>
      <Shimmer {...args}>
        <View style={styles.content} />
      </Shimmer>
    </View>
  )
}

Basic.args = {}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: Dimensions.get('window').width - 40,
    height: 100,
    backgroundColor: 'gray',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
