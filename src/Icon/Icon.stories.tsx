// stories/MyButton.stories.tsx
import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Icon} from './Icon'

export default {
  title: 'components/MyButton',
  component: Icon,
} as ComponentMeta<typeof Icon>

export const IconComponent: ComponentStory<typeof Icon> = args => (
  <Icon source={require('../assets/flash-icon.png')} />
)
