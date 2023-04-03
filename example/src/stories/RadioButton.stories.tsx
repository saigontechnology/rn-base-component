import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {RnRadioButton} from 'rn-base-component'

export default {
  title: 'components/RadioButton',
  component: RnRadioButton,
} as ComponentMeta<typeof RnRadioButton>

export const Basic: ComponentStory<typeof RnRadioButton> = args => <RnRadioButton {...args} />

Basic.args = {
  text: 'Radio Button',
  innerContainerStyle: {width: 150},
}
