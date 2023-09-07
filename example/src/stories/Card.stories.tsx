import React from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'
import {Text} from 'react-native'
import {Card} from 'rn-base-component'

export default {
  title: 'components/Card',
  component: Card,
} as ComponentMeta<typeof Card>

export const Basic: ComponentStory<typeof Card> = rest => (
  <>
    <Card {...rest}>
      <Text>Card</Text>
    </Card>
  </>
)

Basic.args = {
  style: {borderWidth: 1, borderColor: 'red', margin: 10},
}
