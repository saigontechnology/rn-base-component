import React from 'react'
import figma from '@figma/code-connect'
import {Icon, Slider, SliderFixed, SliderFixedRange, SliderRange} from 'rn-base-component'

const SLIDER_FIGMA_URL = '<FIGMA_SLIDER>'
const sliderProps = {
  sliderWidth: 400,
  thumbComponent: <Icon source={require('@/assets/images/thumb.png')} />,
  onValueChange: () => {
    /* TODO: Handle onValueChange */
  },
}

const sliderRangeProps = {
  sliderWidth: 400,
  leftThumbComponent: <Icon source={require('@/assets/images/left.png')} />,
  rightThumbComponent: <Icon source={require('@/assets/images/right.png')} />,
  onValueChange: () => {
    /* TODO: Handle onValueChange */
  },
}

figma.connect(Slider, SLIDER_FIGMA_URL, {
  variant: {type: 'value'},
  props: sliderProps,
  example: props => <Slider {...props} />,
})

figma.connect(SliderRange, SLIDER_FIGMA_URL, {
  variant: {type: 'range'},
  props: sliderRangeProps,
  example: props => <SliderRange minimumValue={0} maximumValue={100} {...props} />,
})

figma.connect(SliderFixed, SLIDER_FIGMA_URL, {
  variant: {type: 'with_marks'},
  props: {
    ...sliderProps,
    step: 4,
  },
  example: props => <SliderFixed {...props} />,
})

figma.connect(SliderFixedRange, SLIDER_FIGMA_URL, {
  variant: {type: '2-side marks'},
  props: sliderRangeProps,
  example: ({...rest}) => <SliderFixedRange minimumValue={0} maximumValue={100} {...rest} />,
})
