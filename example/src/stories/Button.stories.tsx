import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {RnBaseButton} from 'rn-base-component'

export default {
  title: 'components/Button',
  component: RnBaseButton,
} as ComponentMeta<typeof RnBaseButton>

export const Basic: ComponentStory<typeof RnBaseButton> = args => <RnBaseButton {...args} />

Basic.args = {
  text: 'Hello STS Team!',
  color: 'green',
}
