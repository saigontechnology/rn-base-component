import React, {useState} from 'react'
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {RnBaseSlider} from 'rn-base-component'
import {metrics} from '../../../src/helpers/metrics'

export default {
  title: 'components/Slider',
  component: RnBaseSlider,
} as ComponentMeta<typeof RnBaseSlider>

export const Basic: ComponentStory<typeof RnBaseSlider> = () => {
  const [value, setValue] = useState<number>(20)
  const [value1, setValue1] = useState<number>(5)
  const [value2, setValue2] = useState<number>(0)
  const [value3, setValue3] = useState<number>(0)
  const [value4, setValue4] = useState<number>(0)
  const [rangeValue, setRangeValue] = useState<{minimum: number; maximum: number}>({minimum: 20, maximum: 40})
  const [rangeValue1, setRangeValue1] = useState<{minimum: number; maximum: number}>({
    minimum: 10,
    maximum: 40,
  })

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.spacingTop} />
        <RnBaseSlider
          minimumValue={50}
          maximumValue={100}
          trackStyle={styles.height30}
          thumbComponent={
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
              }}
              style={styles.thumb}
              resizeMode={'contain'}
            />
          }
          thumbStyle={[styles.thumb, styles.radius]}
          thumbSize={styles.thumb}
          hasTrackPoint
          sliderWidth={331}
          onValueChange={setValue2}
        />
        <Text style={styles.spacingTop10}>Total: 100, step: 1 - Value: {value2}</Text>
        {/* two thumbs */}
        <View style={styles.spacingTop20} />
        <RnBaseSlider.Range
          minimumValue={20}
          step={2}
          maximumValue={40}
          trackStyle={styles.height10}
          bgColorTracked={'blue'}
          onValueChange={setRangeValue}
          thumbSize={{height: 40, width: 40}}
          hasTrackPoint
          sliderWidth={351}
        />
        <Text style={styles.spacingTop20}>
          Total: 40, step: 2, minimum: {rangeValue.minimum}, maximum: {rangeValue.maximum}
        </Text>
        <View style={styles.spacingTop} />
        <RnBaseSlider.Range
          minimumValue={10}
          step={1}
          maximumValue={40}
          trackStyle={styles.height10}
          onValueChange={setRangeValue1}
          alwaysShowValue
          thumbSize={{height: 40, width: 40}}
          hasTrackPoint
          sliderWidth={351}
        />
        <Text style={styles.spacingTop20}>
          Total: 40, step: 1, minimum: {rangeValue1.minimum}, maximum: {rangeValue1.maximum}
        </Text>
        <View style={styles.spacingTop} />
        <RnBaseSlider
          minimumValue={20}
          step={2}
          maximumValue={40}
          trackStyle={styles.height10}
          bgColorTracked={'blue'}
          hasPointTouch
          isSliderRange
          onValueChange={setValue}
          thumbSize={{height: 40, width: 40}}
          hasTrackPoint
          sliderWidth={331}
        />
        <Text style={styles.spacingTop20}>Total: 40, step: 2 - Value: {value}</Text>
        <View style={styles.spacingTop} />
        <RnBaseSlider
          minimumValue={5}
          maximumValue={10}
          onValueChange={setValue1}
          trackStyle={styles.height10}
          bgColorTrack="red"
          bgColorTracked="green"
          bgColorLabelView={'#00FFFF'}
          thumbStyle={styles.bgColorThumb}
          labelStyle={styles.black}
          hasTrackPoint
          sliderWidth={300}
        />
        <Text style={styles.spacingTop20}>Total: 10, step: 1 - Value: {value1}</Text>
        <View style={styles.spacingTop} />
        <RnBaseSlider
          minimumValue={0}
          maximumValue={2}
          onValueChange={setValue3}
          trackStyle={styles.height10}
          alwaysShowValue
        />
        <Text style={styles.spacingTop20}>Total: 2, step: 1 - Value: {value3}</Text>
        <View style={styles.spacingTop} />
        <RnBaseSlider
          minimumValue={0}
          step={0.5}
          maximumValue={1}
          trackStyle={styles.height10}
          onValueChange={setValue4}
          hasTrackPoint
          sliderWidth={331}
        />
        <Text style={styles.spacingTop20}>Total: 1, step: 0.5 - Value: {value4}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: metrics.medium,
  },
  thumb: {
    height: 50,
    width: 50,
  },
  bgColorThumb: {
    backgroundColor: 'pink',
    borderColor: 'yellow',
  },
  spacingTop: {
    marginTop: 50,
  },
  spacingTop10: {
    marginTop: 10,
  },
  spacingTop20: {
    marginTop: 20,
  },
  height30: {
    height: 30,
  },
  height10: {
    height: 10,
  },
  radius: {
    borderRadius: 10,
  },
  black: {
    color: 'black',
  },
})
