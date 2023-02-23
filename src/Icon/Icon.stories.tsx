// stories/MyButton.stories.tsx
import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Icon} from './Icon'

export default {
  title: 'components/MyButton',
  component: Icon,
} as ComponentMeta<typeof Icon>

export const IconComponent: ComponentStory<typeof Icon> = () => (
  <Icon
    source={{uri: 'https://kenh14cdn.com/203336854389633024/2023/1/17/photo-12-1673980290121902612775.jpeg'}}
  />
)
