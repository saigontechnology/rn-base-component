/* eslint-disable react-native/no-inline-styles */
import type {ComponentMeta, ComponentStory} from '@storybook/react'
import React, {useState} from 'react'

import {View} from 'react-native'
import {Switch} from 'rn-base-component'

export default {
  title: 'components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

export const Basic: ComponentStory<typeof Switch> = args => {
  const [isActive, setIsActive] = useState(false)

  const onValueChange = () => {
    setIsActive(prev => !prev)
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Switch
        {...args}
        variant="outside"
        value={isActive}
        onValueChange={onValueChange}
        thumbColor="green"
        trackColor={{active: 'blue', inActive: 'gray'}}
      />
    </View>
  )
}

export const Inside: ComponentStory<typeof Switch> = args => {
  const [isActive, setIsActive] = useState(false)

  const onValueChange = () => {
    setIsActive(prev => !prev)
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Switch
        {...args}
        variant="inside"
        value={isActive}
        onValueChange={onValueChange}
        trackColor={{active: 'green', inActive: 'gray'}}
      />
    </View>
  )
}
