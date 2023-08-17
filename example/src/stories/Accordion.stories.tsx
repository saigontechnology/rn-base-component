import type {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Accordion} from 'rn-base-component'

export default {
  title: 'components/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>

const data = [
  {
    id: 1,
    title: 'First',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rhoncus eros arcu, ultrices cursus metus dignissim quis. In hac habitasse platea dictumst. Pellentesque hendrerit tellus id velit elementum luctus a in eros. Sed in purus risus. Donec sollicitudin, nisl quis aliquet condimentum, velit ipsum vehicula lacus, at sodales nisl mi vel mi. Maecenas egestas volutpat ullamcorper. Aenean interdum posuere dolor a luctus',
  },
  {
    id: 2,
    title: 'Second',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rhoncus eros arcu, ultrices cursus metus dignissim quis. In hac habitasse platea dictumst. Pellentesque hendrerit tellus id velit elementum luctus a in eros. Sed in purus risus. Donec sollicitudin, nisl quis aliquet condimentum, velit ipsum vehicula lacus, at sodales nisl mi vel mi. Maecenas egestas volutpat ullamcorper. Aenean interdum posuere dolor a luctus',
  },
  {
    id: 3,
    title: 'Third',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rhoncus eros arcu, ultrices cursus metus dignissim quis. In hac habitasse platea dictumst. Pellentesque hendrerit tellus id velit elementum luctus a in eros. Sed in purus risus. Donec sollicitudin, nisl quis aliquet condimentum, velit ipsum vehicula lacus, at sodales nisl mi vel mi. Maecenas egestas volutpat ullamcorper. Aenean interdum posuere dolor a luctus',
  },
]

export const Basic: ComponentStory<typeof Accordion> = args => <Accordion {...args} />

Basic.args = {
  sections: data,
}
