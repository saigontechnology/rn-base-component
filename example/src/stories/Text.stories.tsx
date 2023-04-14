import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {RnBaseText} from 'rn-base-component'

export default {
  title: 'Text',
  component: RnBaseText,
} as ComponentMeta<typeof RnBaseText>

export const BasicText: ComponentStory<typeof RnBaseText> = args => (
  <RnBaseText>
    {'\n'}
    <RnBaseText.Bold {...args} />
    {'\n'}
    <RnBaseText.Underline {...args} />
    {'\n'}
    <RnBaseText.Title {...args} />
    {'\n'}
    <RnBaseText.Span {...args} />
  </RnBaseText>
)
BasicText.args = {
  children: 'Component Basic Text!',
}
