import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'
import {Header} from 'rn-base-component'
import {Text} from 'react-native'

export default {
  title: 'components/Header',
  component: Header,
} as ComponentMeta<typeof Header>

export const Basic: ComponentStory<typeof Header> = rest => <Header {...rest} />

Basic.args = {
  title: 'Header Title',
  rightComponent: <Text>Right Comp</Text>,
}
