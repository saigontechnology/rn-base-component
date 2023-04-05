import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {RnProgress} from 'rn-base-component'

export default {
  title: 'components/Progress',
  component: RnProgress,
} as ComponentMeta<typeof RnProgress>

export const Basic: ComponentStory<typeof RnProgress> = args => <RnProgress {...args} />

Basic.args = {
  value: 20,
  filledTrackColor: '#49BE25',
  backgroundColor: '#E5E5E5',
  borderRadius: 8,
  isIndeterminateProgress: true,
}
