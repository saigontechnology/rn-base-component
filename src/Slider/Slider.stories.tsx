// stories/MyButton.stories.tsx
import React, {useState} from 'react'
import {Image, Text, View} from 'react-native'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import Slider from './Slider'
import {metrics} from '../helpers/metrics'

export default {
  title: 'components/Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>

export const Basic: ComponentStory<typeof Slider> = () => {
  const [value, setValue] = useState<number>(20)
  const [value1, setValue1] = useState<number>(5)
  const [value2, setValue2] = useState<number>(0)
  const [value3, setValue3] = useState<number>(0)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: metrics.medium,
      }}>
      <Slider
        minimumValue={50}
        maximumValue={100}
        trackStyle={{height: 30, width: '100%'}}
        customThumb={
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
            }}
            style={{width: 50, height: 50}}
            resizeMode={'contain'}
          />
        }
        thumbStyle={{height: 50, width: 50, borderRadius: 10}}
        thumbSize={{height: 50, width: 50}}
        hasTrackPoint
        width={351}
        onChangeValue={setValue2}
      />
      <Text style={{marginTop: 10}}>Total: 100, Value: {value2}</Text>
      <View style={{marginTop: 100}} />
      <Slider
        minimumValue={20}
        maximumValue={40}
        trackStyle={{height: 10}}
        onChangeValue={setValue}
        hasTrackPoint
        width={351}
      />
      <Text style={{marginTop: 10}}>Total: 40, Value: {value}</Text>
      <View style={{marginTop: 100}} />
      <Slider
        minimumValue={5}
        maximumValue={10}
        onChangeValue={setValue1}
        trackStyle={{height: 10}}
        hasTrackPoint
        width={300}
      />
      <Text style={{marginTop: 10}}>Total: 10, Value: {value1}</Text>
      <View style={{marginTop: 100}} />
      <Slider minimumValue={0} maximumValue={2} onChangeValue={setValue3} trackStyle={{height: 10}} />
      <Text style={{marginTop: 10}}>Total: 2, Value: {value3}</Text>
    </View>
  )
}
