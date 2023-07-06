import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Step} from 'rn-base-component'

export default {
  title: 'components/Step',
  component: Step,
} as ComponentMeta<typeof Step>

export const Basic: ComponentStory<typeof Step> = args => <Step {...args} />

Basic.args = {
  text: 'Hello STS Team!',
}
