/* eslint-disable react-native/no-inline-styles */
import type {ComponentMeta, ComponentStory} from '@storybook/react'
import React, {useState} from 'react'

import {View} from 'react-native'
import {Switch, useTheme} from 'rn-base-component'

export default {
  title: 'components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

export const Basic: ComponentStory<typeof Switch> = rest => {
  const [isActive, setIsActive] = useState(false)
  const theme = useTheme()

  const onValueChange = () => {
    setIsActive(prev => !prev)
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Switch
        {...rest}
        variant="outside"
        value={isActive}
        onValueChange={onValueChange}
        thumbColor="green"
        trackColor={{active: theme.colors.blue, inActive: theme.colors.red}}
      />
    </View>
  )
}

export const Inside: ComponentStory<typeof Switch> = rest => {
  const [isActive, setIsActive] = useState(false)
  const theme = useTheme()

  const onValueChange = () => {
    setIsActive(prev => !prev)
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Switch
        {...rest}
        variant="inside"
        value={isActive}
        onValueChange={onValueChange}
        trackColor={{active: theme.colors.gray, inActive: theme.colors.red}}
      />
    </View>
  )
}
