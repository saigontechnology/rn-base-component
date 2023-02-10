import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Button} from './Button'

export default {
  title: 'components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

export const Test: ComponentStory<typeof Button> = args => <Button {...args} />

Test.args = {
  title: 'Hello STS Team!',
  buttonStyle: {backgroundColor: 'rgba(78, 116, 289, 1)', borderRadius: 3},
  titleStyle: {color: '#FFFFFF'},
  containerStyle: {width: 200, marginHorizontal: 50, marginVertical: 10},
}
