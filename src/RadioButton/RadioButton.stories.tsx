// stories/MyButton.stories.tsx
import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import RadioButton from './RadioButton'

export default {
  title: 'components/MyButton',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>

export const Basic: ComponentStory<typeof RadioButton> = args => <RadioButton {...args} />

Basic.args = {
  text: '123',
  initial: true,
}
