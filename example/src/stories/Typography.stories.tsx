import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Typography} from 'rn-base-component'
import {StyleSheet, View} from 'react-native'
import {metrics} from '../../../src/helpers'

export default {
  title: 'components/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>

export const Basic: ComponentStory<typeof Typography> = () => (
  <View style={styles.container}>
    <Typography color={'green'} variant={'h1'}>
      H1
    </Typography>
    <Typography color={'pink'} variant={'h2'}>
      H2
    </Typography>
    <Typography color={'blue'} variant={'regular'}>
      Regular
    </Typography>
    <Typography
      color={'red'}
      style={{
        marginVertical: 20,
      }}
      variant={'bold'}
    >
      Bold
    </Typography>
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingVertical: metrics.marginVertical,
    paddingHorizontal: metrics.paddingHorizontal,
  },
})
