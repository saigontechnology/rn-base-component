import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import Checkbox from './Checkbox'

export default {
  title: 'components/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

export const Basic: ComponentStory<typeof Checkbox> = args => <Checkbox {...args} />

Basic.args = {
  size: 25,
  fillColor: 'green',
  text: 'Checkbox text',
  innerIconStyle: {borderWidth: 2},
}
