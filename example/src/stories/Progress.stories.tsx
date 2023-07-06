import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Progress} from 'rn-base-component'

export default {
  title: 'components/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>

export const Basic: ComponentStory<typeof Progress> = args => <Progress {...args} />

Basic.args = {
  value: 20,
  filledTrackColor: '#49BE25',
  backgroundColor: '#E5E5E5',
  borderRadius: 8,
}
