import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {BaseText} from 'rn-base-component'

export default {
  title: 'Text',
  component: BaseText,
} as ComponentMeta<typeof BaseText>

export const BasicText: ComponentStory<typeof BaseText> = args => (
  <BaseText>
    {'\n'}
    <BaseText.Bold {...args} />
    {'\n'}
    <BaseText.Underline {...args} />
    {'\n'}
    <BaseText.Title {...args} />
    {'\n'}
    <BaseText.Span {...args} />
  </BaseText>
)
BasicText.args = {
  children: 'Component Basic Text!',
}
