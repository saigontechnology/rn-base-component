import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Button} from 'rn-base-component'

export default {
  title: 'components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

export const Basic: ComponentStory<typeof Button> = args => <Button {...args} />

Basic.args = {
  text: 'Hello STS Team!',
}
