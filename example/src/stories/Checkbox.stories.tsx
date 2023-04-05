import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {RnBaseCheckbox} from 'rn-base-component'

export default {
  title: 'components/Checkbox',
  component: RnBaseCheckbox,
} as ComponentMeta<typeof RnBaseCheckbox>

export const Basic: ComponentStory<typeof RnBaseCheckbox> = args => <RnBaseCheckbox {...args} />

Basic.args = {
  size: 25,
  fillColor: 'green',
  text: 'Checkbox text',
  innerIconStyle: {borderWidth: 2},
}
