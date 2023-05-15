import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {RadioButton} from 'rn-base-component'

export default {
  title: 'components/RadioButton',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>

export const Basic: ComponentStory<typeof RadioButton> = args => <RadioButton {...args} />

Basic.args = {
  text: 'Radio Button',
}
