import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {RnDraggableList} from 'rn-base-component'

export default {
  title: 'components/DraggableList',
  component: RnDraggableList,
} as ComponentMeta<typeof RnDraggableList>

export const Basic: ComponentStory<typeof RnDraggableList> = args => <RnDraggableList {...args} />

Basic.args = {}
